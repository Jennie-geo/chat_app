import ChannelModel from '../model/channel';
import { Request, Response } from 'express';
import { channelValidation } from '../middleware/validation';
import { send } from 'process';

export async function createChannel(req: Request, res: Response): Promise<any> {
  //validation
  try {
    const validation = channelValidation.validate(req.body);
    if (validation.error) {
      console.log(validation.error);
    }
    const channel = await ChannelModel.findOne({ name: req.body.name });
    if (channel)
      return res.send({
        message: `${req.body.name} channel already exists`,
        channel,
      });
    const newChannel = new ChannelModel({
      name: req.body.name,
      description: req.body.description,
    });
    await newChannel.save();
    res.json({ message: 'New channel created', data: newChannel });
  } catch (err: any) {
    res.send({ Error: err.message });
  }
}
export async function getAllExistingChannels(
  req: Request,
  res: Response,
): Promise<any> {
  const channels = await ChannelModel.find();
  if (!channels) {
    res.send({});
  } else {
    res.send({ data: channels });
  }
}

export async function joinChannel(req: Request, res: Response): Promise<any> {
  try {
    const channel = await ChannelModel.findOne({ name: req.body.name });
    if (!channel) return res.json({ msg: 'No channel with the id exists' });
    channel.status = 'active';
    channel.count = channel.count++;
  } catch (err) {
    res.send(err);
  }
}

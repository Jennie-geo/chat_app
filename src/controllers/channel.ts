import jwt from 'jsonwebtoken';
import ChannelModel from '../model/channel';
import { Request, Response } from 'express';
import {
  channelValidation,
  joinChannelValidation,
} from '../middleware/validation';
import User from '../model/user';

interface customJwtPayLoad extends jwt.JwtPayload {
  adminId?: string;
  userId?: string;
}

export async function createChannel(req: Request, res: Response): Promise<any> {
  //validation
  try {
    const validation = channelValidation.validate(req.body);
    if (validation.error) {
      console.log(validation.error);
      //return res.send('Validation error', errors);
    }
    const user = await User.findById({ _id: req.body.id });
    const channel = await ChannelModel.findOne({ name: req.body.name });
    if (channel)
      return res.send({
        message: `${req.body.name} channel already exists, Please go ahead and join the channel.`,
        channel,
      });
    const newChannel = new ChannelModel({
      name: req.body.name,
      description: req.body.description,
      admin: user._id,
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
  //const user = await User.findById({_id: req.body.id});
  if (!channels) {
    res.send({});
  } else {
    res.send({ data: channels });
  }
}

export async function joinChannel(req: Request, res: Response): Promise<any> {
  const validation = joinChannelValidation.validate(req.body);
  if (validation.error) {
    console.log(validation.error);
  }
  try {
    const channel = await ChannelModel.findOne({ _id: req.params.id });
    if (!channel) return res.json({ msg: 'No channel with the id exists' });

    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send('You have to login to continue');
    }
    const tokenBody = token.slice(7);

    jwt.verify(
      tokenBody,
      'SECRET',
      async (err, decoded: customJwtPayLoad | undefined) => {
        if (err) {
          console.log('error', err);
          return res.status(403).send({ Error: 'Access denied' });
        } else {
          //there is a valid token
          const { userId } = decoded!;
          let count = 0;
          const user = await User.findById(userId);

          if (!user) {
            return res.send({
              login: `No user with the id ${userId} exists`,
            });
          }
          if (channel.members.includes(user._id)) {
            res.send({ msg: 'this Id already exists' });
          }
          channel.members.push(user);
          channel.status = 'active';
          channel.count = count++;
          channel.save();
          res.json({ success: true, data: channel });
        }
      },
    );
  } catch (err) {
    res.send(err);
  }
}

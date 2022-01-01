import Mongoose from 'mongoose';

const channelSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
  },
  {
    timestamps: true,
  },
);

const ChannelModel = Mongoose.model('channel', channelSchema);

export default ChannelModel;

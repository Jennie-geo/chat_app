import Mongoose from 'mongoose';

const channelSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admin: {
      type: String,
      ref: 'User',
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
    members: {
      type: Array,
    },
  },

  {
    timestamps: true,
  },
);

const ChannelModel = Mongoose.model('channel', channelSchema);

export default ChannelModel;

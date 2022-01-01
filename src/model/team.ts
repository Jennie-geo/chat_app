import { ref } from '@hapi/joi';
import Mongoose from 'mongoose';

const teamSchema = new Mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  teamMember: {
    user: [ref],
  },
});

const team = Mongoose.model('team', teamSchema);

export default team;

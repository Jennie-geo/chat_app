import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
    },
    phone: {
      type: Number,
    },
    bio: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      //required: true,
    },
    admin_details: {
      type: Object,
      schema: {
        role: {
          type: String,
          required: true,
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = Mongoose.model('User', userSchema);

export default User;

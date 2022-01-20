import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: Buffer,
    },
    bio: {
      type: String,
    },
    phone: {
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
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
    },
    admin_details: {
      type: String,
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

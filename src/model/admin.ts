import Mongoose from 'mongoose';

const adminSchema = new Mongoose.Schema(
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
      index: {
        name: 'admin-email-index',
        global: true,
      },
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

const Admin = Mongoose.model('Admin', adminSchema);

export default Admin;

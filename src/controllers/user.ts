//require('dotenv').config();
import User from '../model/user';
import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import { userSchema, loginSchema } from '../middleware/validation';
import { GOOGLE_CLIENT_ID } from '../config';
import { OAuth2Client } from 'google-auth-library';
//import { authenticateUserAccess } from '../auth/checkAuthentication';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
import Admin from '../model/admin';
//import config from '../config'

dotenv.config();
const result = crypto.randomBytes(64).toString('hex');

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

interface User {
  name?: string;
  email?: string;
  picture?: string;
}

export async function createUser(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  try {
    const validation = userSchema.validate(req.body);
    if (validation.error) {
      console.log(validation.error);
      //return res.send('Validation error', errors.array())
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.send({ success: true, message: 'User already exists' });
    } else {
      const userPasswd = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        bio: req.body.bio,
        password: userPasswd,
        confirmPasword: userPasswd,
      });
      await newUser.save();
      res.send({ success: true, data: newUser });
    }
  } catch (e) {
    res.send({ success: false, msg: (e as Error).message });
  }
}

export async function userLogin(req: Request, res: Response): Promise<any> {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.send({ msg: 'No user with this email exists' });
    }
    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!matchPassword) {
      res.send({ msg: "Authentication failed, Password doesn't match" });
    } else {
      const token = jwt.sign({ user }, 'SECRET', { expiresIn: '1hrs' });
      //res.cookie('Authorization', token, { httpOnly: true });
      res.setHeader('Authorization', token);
      return res.status(200).json({
        message: 'Auth successful',
        token: token,
      });
      //res.send({ data: 'welcome to user profile details' });
      //return res.render('userloginhome');
    }
  } catch (err) {
    console.log(err);
  }
}

export async function userLogout(req: Request, res: Response): Promise<void> {
  res.clearCookie('Authorization');
  res.send({ message: 'User logged out' });
}
export async function getUserProfileDetail(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      res.send({ msg: 'no user exists' });
    } else {
      res.send(user);
    }
  } catch (err) {
    res.send(err);
  }
}
export async function updateUserProfile(
  req: express.Request,
  res: express.Response,
): Promise<void> {
  try {
    const user = await User.findById({ _id: req.params.id });

    if (!user) {
      res.send({ message: 'No user exists with this id' });
    }
    user.photo = req.body.photo;
    user.bio = req.body.bio;
    user.phone = req.body.phone;
    //user.admin_details.schema.role = req.body.admin;
    await user.save();
    res.send('sucessfully saved');
  } catch (err: any) {
    res.send(err);
  }
}
export async function createAdmin(req: Request, res: Response): Promise<any> {
  try {
    const validation = userSchema.validate(req.body);
    if (validation.error) {
      console.log(validation.error);
      //return res.send('Validation error', errors.array())
    }
    const admin = await User.findOne({ email: req.body.email });
    if (admin) {
      return res.send('admin already exist');
    }
    const adminPassword = await bcrypt.hash(req.body.password, 10);
    const createAdmin = new User({
      name: req.body.name,
      email: req.body.email,
      password: adminPassword,
      phone: req.body.phone,
      bio: req.body.bio,
      role: req.body.role,
      //create_by: { name: `${admin.name}`, _id: admin._id },
    });
    await createAdmin.save();
    res.send({ msg: 'admin created successful', createAdmin });
  } catch (err: any) {
    res.send({ Error: err.message });
    console.log(err);
  }
}
export async function loginAdmin(req: Request, res: Response): Promise<any> {
  try {
    const admin = await User.findOne({ email: req.body.email });
    if (!admin) {
      return res.json({ message: 'No Admin Exists.' });
    }
    const adminPassword = await bcrypt.compare(
      req.body.password,
      admin.password,
    );
    if (!adminPassword) {
      return res.send({ message: "password doesn't match" });
    } else {
      //console.log(admin._id, admin._id.toString(), admin.id);
      const token = jwt.sign({ adminId: admin.id }, 'SECRET', {
        expiresIn: '1hrs',
      });
      res.setHeader('Authorization', token);
      return res.status(200).json({
        message: 'Login successful',
        token: token,
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}
export async function getAdmin(req: Request, res: Response): Promise<any> {
  const admin = await User.find({ role: 'admin' });
  try {
    if (!admin) return res.send('No admin exist');
    res.status(200).json({ data: admin });
  } catch (err) {
    console.log(err);
  }
}
// export async function loginPageWithGoogle(
//   req: express.Request,
//   res: express.Response,
// ): Promise<void> {
//   res.render('login');
// }

// export async function postLogin(
//   req: express.Request,
//   res: express.Response,
// ): Promise<void> {
//   const token = req.body.token;
//   console.log(token);

//   async function verify() {
//     const ticket = await client.verifyIdToken({
//       idToken: token, //TOKEN SENT FROM THE FRONT END
//       audience: GOOGLE_CLIENT_ID,
//     });
//     const payload: any = ticket.getPayload();
//     const userid = payload['sub'];
//     console.log(payload);
//   }
//   verify()
//     .then(() => {
//       res.cookie('session-token', token);
//       res.send('success');
//     })
//     .catch(console.error);
// }

// export async function getProfile(
//   req: any,
//   res: express.Response,
// ): Promise<void> {
//   const user = req.user;
//   res.render('dashboard', { user });
// }
// export async function getProtectedRoute(
//   req: express.Request,
//   res: express.Response,
// ): Promise<void> {
//   res.render('protectedRoute');
// }
// export async function logoutUser(
//   req: express.Request,
//   res: express.Response,
// ): Promise<void> {
//   res.clearCookie('session-token');
//   res.redirect('/login');
// }

// export async function homePage(
//   _req: express.Request,
//   res: express.Response,
// ): Promise<void> {
//   res.render('index', {
//     title: 'Hello world.....',
//   });
// }
//stop

// export async function facebookPage(
//   _req: express.Request,
//   res: express.Response,
// ): Promise<void> {
//   res.render('facebookAuth', {
//     title: 'Hello world.....',
//   });
// }

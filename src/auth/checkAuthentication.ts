import express, { NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID } from '../config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
const result = crypto.randomBytes(64).toString('hex');
//console.log('my result', result);
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

interface User {
  name?: string;
  email?: string;
  picture?: string;
}

function checkAuthenticated(
  req: any,
  res: express.Response,
  next: NextFunction,
) {
  const token = req.cookies['session-token'];
  const user: User = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload);
    user.name = payload?.name;
    user.email = payload?.email;
    user.picture = payload?.picture;
  }
  verify()
    .then(() => {
      req.user = user;
      next();
    })
    .catch(() => {
      res.redirect('/login');
    });
}

async function authenticateUserAccess(user: string): Promise<any> {
  return jwt.sign(user, result, { expiresIn: '1hrs' });
}

export { checkAuthenticated, authenticateUserAccess };

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
//import {config} from '../config'

interface User extends Request {
  user?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export function authlogin(req: User, res: Response, next: NextFunction): any {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('You have to login to continue');
  }
  //verify token
  const tokenBody = token.slice(7);
  jwt.verify(tokenBody, 'SECRET', (err, decoded) => {
    if (err) {
      console.log('error', err);
      return res.status(403).send({ Error: 'Access denied' });
    } else {
      next();
    }
  });
}
export function adminAuth(permission: string) {
  return (req: User, res: Response, next: NextFunction): any => {
    const adminRole = req.body.role;
    if (permission === adminRole) {
      next();
    } else {
      return res.status(401).send('Not allowed to continue');
    }

    next();
  };
}
//export default { authlogin };
//module.exports = { authlogin, adminAuth };

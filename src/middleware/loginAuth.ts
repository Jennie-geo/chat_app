import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../model/user';
//import {config} from '../config'

interface Users extends Request {
  user?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export function authlogin(req: Users, res: Response, next: NextFunction): any {
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
      //there is a valid token
      next();
    }
  });
}
interface customJwtPayLoad extends jwt.JwtPayload {
  adminId?: string;
}
export function adminAuth(req: Users, res: Response, next: NextFunction): any {
  console.log('adminAuth: working');
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('login please');
  }
  const admintokenBody = token.slice(7);
  jwt.verify(
    admintokenBody,
    'SECRET',
    async (err, decoded: customJwtPayLoad | undefined) => {
      if (err) {
        return res.status(403).send({ Error: 'Access denied' });
      } else {
        const { adminId } = decoded!;
        const user = await User.findById(adminId);
        console.log('admin auth says:', user);
        if (!user) {
          return res.send({ msg: 'No admin exists with this id' });
        }
        if (user.role === 'admin') {
          next();
          //res.send({ result: 'welcome on board' });
        } else {
          return res.send({ msg: 'you are not an admin' });
        }
      }
    },
  );
}

//export default { authlogin };
//module.exports = { authlogin, adminAuth };

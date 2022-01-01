import { NextFunction, Request, Response } from 'express';
interface User extends Request {
  user: null;
  name: string;
  email: string;
  password: string;
}

export function authlogin(req: User, res: Response, next: NextFunction): any {
  if (req.user == null) {
    return res.status(403).send('you need to login');
  }
  next();
}
export function adminAuth(role: string) {
  return (req: User, res: Response, next: NextFunction): any => {
    if (req.user.admin_details.schema.role !== role) {
      return res.status(401).send('Not allowed to continue');
    }

    next();
  };
}
//export default { authlogin };
//module.exports = { authlogin, adminAuth };

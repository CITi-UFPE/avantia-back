import { Request, Response, NextFunction } from 'express';
import { User } from '../models';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({ address: req.ip });

    if (users.length === 0) {
      const user = await User.create({ address: req.ip });
      res.locals.user = user;
    } else {
      res.locals.user = users[0];
    }

    console.log(res.locals.user);
    return next();
  } catch (err) {
    return next(err);
  }
};
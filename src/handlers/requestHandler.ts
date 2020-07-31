import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!res.locals) {
      res.locals = {};
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
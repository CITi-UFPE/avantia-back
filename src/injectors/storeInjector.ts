import { Request, Response, NextFunction } from 'express';
import { Store } from 'express-session';

export default (store: Store) => (req: Request, res: Response, next: NextFunction) => {
  try {
    res.locals.store = store;

    return next();
  } catch (err) {
    return next(err);
  }
};
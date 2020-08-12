import { Request, Response, NextFunction } from 'express';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.locals.store.all((err: Error, sessions: Express.Session[]) => {
      res.locals.status = 200;
      res.locals.message = 'Accesses found!'
      console.log(req.ip);
      res.locals.data = sessions.length;
      next();
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
}
import { Request, Response, NextFunction } from 'express';

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = error.message || error;
  res.locals.status = res.locals.status || 400;
  res.locals.isError = true;

  return next();
};

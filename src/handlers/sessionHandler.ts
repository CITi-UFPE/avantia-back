import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const session = req.session;
  res.send(`ip: ${req.connection.remoteAddress}\nsessionId: ${req.sessionID}\nsession: ${JSON.stringify(session)}`);
  // next();
};
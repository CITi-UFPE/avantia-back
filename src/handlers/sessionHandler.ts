import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.expires) {
      req.session.expires = req.session.cookie.expires;
    }

    const expiringDate = req.session.expires;

    if (Date.now() > expiringDate.getTime()) {
      res.locals.status = 403;
      return next('Session expired');
    }

    if (req.session.lastAccess && req.session.stopped) {
      const timeSinceLastAccess = Date.now() - req.session.lastAccess;
      const newExpiringDate = new Date(expiringDate.getTime() + timeSinceLastAccess);
      req.session.expires = newExpiringDate;
      res.locals.expiringDate = newExpiringDate;
    } else {
      res.locals.expiringDate = expiringDate;
    }

    req.session.lastAccess = Date.now();
    req.session.stopped = false;

    setTimeout(() => {
      res.locals.store.get(req.sessionID, (err: Error, session: typeof req.session) => {
        if (!err && session && Date.now() - session.lastAccess > 10000) {
          session.stopped = true;
          res.locals.store.set(req.sessionID, session);
        }
      });
    }, 10000);

    return next();
  } catch (err) {
    return next(err);
  }
};
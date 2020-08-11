import { Request, Response, NextFunction } from 'express';
import session = require('express-session');

export default async (req: Request, res: Response, next: NextFunction) => {
  const {
    message,
    data,
    status,
    type,
    neuralNetLatency,
    expiringDate,
  } = res.locals;

  if (!message && !data) {
    res.status(404).json({
      isError: true,
      message: 'Route not Found',
    });
    return;
  }

  if (type === 'file') {
    res.status(status || 200).sendFile(data);
    return;
  }

  const response = {
    message,
    data,
    neuralNetLatency,
    expiringDate,
  };

  res.set('Access-Control-Allow-Origin', process.env.CLIENT_URL)

  res.status(status || 200).json(response);
};

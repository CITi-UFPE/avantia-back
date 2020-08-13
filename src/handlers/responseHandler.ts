import { Request, Response, NextFunction } from 'express';
import path from 'path';

export default async (req: Request, res: Response, next: NextFunction) => {
  const {
    message,
    data,
    status,
    type,
    expiringDate,
    isError,
  } = res.locals;

  if (!message && !data) {
    res.status(404).json({
      isError: true,
      message: 'Route not Found',
    });
    return;
  }

  if (type === 'file') {
    res.status(status || 200).sendFile(path.join(__dirname, data));
    return;
  }

  const response = {
    isError,
    message,
    expiringDate,
    data,
  };

  res.set('Access-Control-Allow-Origin', process.env.CLIENT_URL);

  res.status(status || 200).json(response);
};

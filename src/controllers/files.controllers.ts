import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

export const get =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileName } = req.params;

    const files = fs.readdirSync(path.join(__dirname, '../../media'));
    const fileNames = files.map((file) => file.split('.')[0]);

    if (fileNames.indexOf(fileName) === -1) {
      res.locals.status = 404;
      return next('File not found');
    }

    res.locals.type = 'file';
    res.locals.data = `../../media/${files[fileNames.indexOf(fileName)]}`;

    return next();
  } catch (err) {
    return next(err);
  }
};
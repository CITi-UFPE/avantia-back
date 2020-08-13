import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileId = req.file.filename.split('-')[0];
    const extension = req.file.filename.split('.')[1];

    res.locals.message = 'Data stored';
    res.locals.data = {
      fileId,
      fileType: extension === 'png' ? 'image' : 'video',
    }
    next();
  } catch (err) {
    return next(err);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileName } = req.params;

    if (!fileName) {
      res.locals.status = 404;
      return next('File not found');
    }

    const files = fs.readdirSync('uploads');
    const fileIds = files.map((fileName) => fileName.split('-')[0]);

    if (fileIds.indexOf(fileName) === -1) {
      res.locals.status = 404;
      return next('File not found');
    }

    const targetFile = files[fileIds.indexOf(fileName)];

    res.locals.type = 'file';
    res.locals.data = `../../uploads/${targetFile}`;

    next();
  } catch (err) {
    return next(err);
  }
};

import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileId = req.file.filename.split('-')[0];
    const extension = req.file.filename.split('.')[1];

    let fileType = 'unknown';

    if (extension === 'png') fileType = 'image';
    if (extension === 'mp4') fileType = 'video';

    res.locals.message = 'Data stored';
    res.locals.data = {
      fileId,
      fileType,
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
    console.log(files);
    const fileIds = files.map((fileName) => fileName.split('-')[0]);

    if (fileIds.indexOf(fileName) === -1) {
      res.locals.status = 404;
      return next('File not found');
    }

    const targetFile = files[fileIds.indexOf(fileName)];

    const content = fs.readFileSync(path.join(__dirname, `uploads/${targetFile}`), { encoding: 'base64' });
    const extension = targetFile.split('.')[1];

    let fileType = 'unknown';

    if (extension === 'png') fileType = 'image';
    if (extension === 'mp4') fileType = 'video';

    res.locals.message = 'File found';
    res.locals.data = {
      content,
      type: fileType,
    };
    next();
  } catch (err) {
    return next(err);
  }
};

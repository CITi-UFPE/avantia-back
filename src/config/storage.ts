import multer from 'multer';
import fs from 'fs';
import generateRandomString from '../helpers/generateRandomString';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync('uploads/')) {
      fs.mkdirSync('uploads/');
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = `${generateRandomString(8)}-${Date.now()}`;
    const extension = file.originalname.split('.')[1];
    cb(null, `${fileName}.${extension}`);
  }
});

export default storage;

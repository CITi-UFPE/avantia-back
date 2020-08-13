import { Router } from 'express';
import multer from 'multer';

import { get, post } from '../controllers/upload.controllers';

import { storage } from '../config';

const upload = multer({ storage });

const router = Router();

router.route('/')
  .post(upload.single('media'), post);

router.route('/:fileName')
  .get(get);

export default router;

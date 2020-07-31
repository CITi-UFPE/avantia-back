import { Router } from 'express';
import multer from 'multer';

import { post } from '../controllers/image.controllers';

const upload = multer();

const router = Router();

router.route('/')
  .post(upload.any(), post);

export default router;

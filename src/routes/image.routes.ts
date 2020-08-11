import { Router } from 'express';
import multer from 'multer';

import { post } from '../controllers/image.controllers';

import { sessionHandler } from '../handlers';

const upload = multer();

const router = Router();

router.route('/')
  .post(sessionHandler, upload.any(), post);

export default router;

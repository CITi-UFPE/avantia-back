import { Router } from 'express';

import { get } from '../controllers/access.controllers';

const router = Router();

router.route('/')
  .get(get);

export default router;

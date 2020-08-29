import { Router } from 'express';

import { get } from '../controllers/files.controllers';

const router = Router();

router.route('/:fileName')
  .get(get);

export default router;

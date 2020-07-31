import { Router } from 'express';
import path from 'path';

const router = Router();

router.route('/')
  .get((req, res, next) => {
    res.locals.type = 'file';
    res.locals.data = path.join(__dirname, '../frontend/index.html');
    next();
  });

export default router;

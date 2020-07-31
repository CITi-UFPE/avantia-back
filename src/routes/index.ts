import { Router } from 'express';

import imageRoutes from './image.routes';
import serveRoutes from './serve.routes';

const router = Router();

router.use('/image', imageRoutes);
router.use('/', serveRoutes);

export default router;

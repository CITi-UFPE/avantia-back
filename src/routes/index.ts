import { Router } from 'express';

import imageRoutes from './image.routes';

const router = Router();

router.use('/image', imageRoutes);

export default router;

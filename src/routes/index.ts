import { Router } from 'express';

import imageRoutes from './image.routes';
import accessRoutes from './access.routes';

const router = Router();

router.use('/image', imageRoutes);
router.use('/accesses', accessRoutes);

export default router;

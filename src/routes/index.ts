import { Router } from 'express';

import imageRoutes from './image.routes';
import accessRoutes from './access.routes';
import uploadRoutes from './upload.routes';

const router = Router();

router.use('/image', imageRoutes);
router.use('/accesses', accessRoutes);
router.use('/uploads', uploadRoutes);

export default router;

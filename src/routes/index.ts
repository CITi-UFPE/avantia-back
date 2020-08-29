import { Router } from 'express';

import imageRoutes from './image.routes';
import accessRoutes from './access.routes';
import uploadRoutes from './upload.routes';
import filesRoutes from './files.routes';

const router = Router();

router.use('/image', imageRoutes);
router.use('/accesses', accessRoutes);
router.use('/uploads', uploadRoutes);
router.use('/files', filesRoutes);

export default router;

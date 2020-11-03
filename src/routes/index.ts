import { Router } from 'express';

import imageRoutes from './image.routes';
import accessRoutes from './access.routes';
import uploadRoutes from './upload.routes';
import filesRoutes from './files.routes';
import commonRoutes from './common.routes';

import { userInjector } from '../injectors';

const router = Router();

router.use('/image', imageRoutes);
router.use('/common', commonRoutes);
router.use('/accesses', accessRoutes);
router.use('/uploads', userInjector, uploadRoutes);
router.use('/files', filesRoutes);

export default router;

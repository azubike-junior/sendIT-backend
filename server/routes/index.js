import express from 'express';

const router = express.Router();

import parcelRoutes from './parcel'
import userRoutes from './users'

router.use('/user', userRoutes);
router.use('/parcel', parcelRoutes)

export default router;
import express from 'express';
const router = express.Router();
import { authlogin, adminAuth } from '../middleware/loginAuth';
import { createChannel, getAllExistingChannels } from '../controllers/channel';

router.post(
  '/api/v1/create_channel',
  // authlogin,
  // adminAuth('admin'),
  createChannel,
);
router.get(
  '/api/v1/getAllChannels',
  authlogin,
  adminAuth,
  getAllExistingChannels,
);

export default router;

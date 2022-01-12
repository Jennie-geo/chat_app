import express from 'express';
const router = express.Router();
import { authlogin, adminAuth } from '../middleware/loginAuth';
import {
  createChannel,
  getAllExistingChannels,
  joinChannel,
} from '../controllers/channel';

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
router.post('/api/v1/joinAChannel/:id', joinChannel);

export default router;

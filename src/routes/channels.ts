import express from 'express';
const router = express.Router();
import { authlogin, adminAuth } from '../middleware/loginAuth';
// import multer from 'multer';

import {
  createChannel,
  getAllExistingChannels,
  joinChannel,
  getChannelMembers,
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
router.get('/api/v1/getchannelmembers/:id', getChannelMembers);
//router.get('api/vi/image/:id', displayImage);
export default router;

import express from 'express';
const router = express.Router();
import { authlogin, adminAuth } from '../middleware/loginAuth';
import multer from 'multer';
import { upload } from '../middleware/upload';

import {
  createChannel,
  getAllExistingChannels,
  joinChannel,
  getChannelMembers,
  imageUpload,
  deleteImg,
  displayImage,
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
router.post('/upload', upload.single('upload'), imageUpload);
router.delete('/api/v1/upload', deleteImg);
router.get('api/vi/image/:id', displayImage);
export default router;

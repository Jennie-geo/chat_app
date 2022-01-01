import express from 'express';
const router = express.Router();

import {
  updateUserProfile,
  getUserProfileDetail,
  createUser,
  userLogout,
  homePage,
  loginPageWithGoogle,
  userLogin,
  getProfile,
  getProtectedRoute,
  logoutUser,
  //facebookPage,
} from '../controllers/user';
import { checkAuthenticated } from '../auth/checkAuthentication';

router.get('/', homePage);
router.post('/api/v1/user/create_User', createUser);
router.post('/api/v1/user/authenticate/google');
router.put('/api/vi/createUserProfile/:id', updateUserProfile);
router.get('/api/vi/getUser/:email', getUserProfileDetail);
router.get('/api/vi/user_login', loginPageWithGoogle);
router.post('/api/login', userLogin);
router.post('/api/logout', userLogout);
router.get('/dashboard', checkAuthenticated, getProfile);
router.get('/protectedRoute', checkAuthenticated, getProtectedRoute);
router.get('/logout', logoutUser);
//router.get('/facebook', facebookPage);
export default router;

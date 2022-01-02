import express from 'express';
const router = express.Router();

import {
  updateUserProfile,
  getUserProfileDetail,
  createUser,
  userLogout,
  userLogin,
  createAdmin,
  // homePage,
  // loginPageWithGoogle,
  // getProfile,
  // getProtectedRoute,
  // logoutUser,
  //facebookPage,
} from '../controllers/user';
import { checkAuthenticated } from '../auth/checkAuthentication';

//router.get('/', homePage);
router.post('/api/v1/user/create_User', createUser);
router.post('/api/v1/user/authenticate/google');
router.post('/api/v1/user/create_Admin', createAdmin);
router.put('/api/vi/createUserProfile/:id', updateUserProfile);
router.get('/api/vi/getUser/:email', getUserProfileDetail);
router.post('/api/login', userLogin);
router.post('/api/logout', userLogout);
//router.get('/api/vi/user_login', loginPageWithGoogle);
// router.get('/dashboard', checkAuthenticated, getProfile);
// router.get('/protectedRoute', checkAuthenticated, getProtectedRoute);
// router.get('/logout', logoutUser);
//router.get('/facebook', facebookPage);
export default router;

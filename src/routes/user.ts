import express from 'express';
const router = express.Router();

import {
  updateUserProfile,
  getUserProfileDetail,
  createUser,
  createAdmin,
  getAdmin,
  loginUser,
  // homePage,
  // loginPageWithGoogle,
  // getProfile,
  // getProtectedRoute,
  // logoutUser,
  //facebookPage,
} from '../controllers/user';
//import { checkAuthenticated } from '../auth/checkAuthentication';
import { adminAuth, authlogin, isLoggedIn } from '../middleware/loginAuth';

//router.get('/', homePage);
router.post('/api/v1/user/create_User', createUser);
router.post('/api/v1/user/authenticate/google');
router.post('/api/v1/admin/create_Admin', createAdmin);
router.get('/api/v1/admin/getAdmin', authlogin, adminAuth, getAdmin);
router.post('/api/v1/admin/login', isLoggedIn, loginUser);
router.put('/api/vi/createUserProfile/:id', authlogin, updateUserProfile);
router.get('/api/vi/getUser', authlogin, getUserProfileDetail);
//allow login to be accessible only if you are a guess

//router.get('/api/vi/user_login', loginPageWithGoogle);
// router.get('/dashboard', checkAuthenticated, getProfile);
// router.get('/protectedRoute', checkAuthenticated, getProtectedRoute);
// router.get('/logout', logoutUser);
//router.get('/facebook', facebookPage);
export default router;

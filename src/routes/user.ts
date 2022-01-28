import express from 'express';
const router = express.Router();
import { upload } from '../middleware/upload';
import {
  updateUserProfile,
  getUserProfileDetail,
  createUser,
  createAdmin,
  getAdmin,
  loginUser,
  imageUpload,
  deleteImg,
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
router.post('/api/v1/user/login', isLoggedIn, loginUser);
router.put('/api/v1/createUserProfile/:id', authlogin, updateUserProfile);
router.get('/api/v1/getUser', authlogin, getUserProfileDetail);
router.post('/api/v1/upload', upload.single('upload'), imageUpload);
router.delete('/api/v1/upload', deleteImg);
//allow login to be accessible only if you are a guess

//router.get('/api/vi/user_login', loginPageWithGoogle);
// router.get('/dashboard', checkAuthenticated, getProfile);
// router.get('/protectedRoute', checkAuthenticated, getProtectedRoute);
// router.get('/logout', logoutUser);
//router.get('/facebook', facebookPage);
export default router;

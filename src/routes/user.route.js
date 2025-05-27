import express from 'express';
import * as userController from '../controllers/user.controller';
import { loginValidator, newUserValidator, resetPasswordValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { loginRateLimiter } from '../middlewares/rateLimiter.middleware';

const router = express.Router();

//route to create a new user
router.post('', newUserValidator, userController.registerUser);
router.post('/login',loginRateLimiter, loginValidator, userController.loginUser);
router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password', userAuth, resetPasswordValidator, userController.resetPassword);


export default router;

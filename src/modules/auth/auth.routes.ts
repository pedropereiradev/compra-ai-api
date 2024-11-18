import { validateRequest } from '@src/core/middlewares/validate-request.middleware';
import { Router } from 'express';
import AuthController from './auth.controller';
import {
  refreshTokensSchema,
  signInSchema,
  signUpSchema,
} from './auth.request';
import { AuthService } from './auth.service';

const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.post(
  '/signup',
  validateRequest(signUpSchema),
  authController.signUp.bind(authController),
);
router.post(
  '/login',
  validateRequest(signInSchema),
  authController.login.bind(authController),
);

router.post(
  '/refresh',
  validateRequest(refreshTokensSchema),
  authController.refreshToken.bind(authController),
);

export default router;

import { authMiddleware } from '@src/core/middlewares/auth.middleware';
import { Router } from 'express';
import UserController from './user-controller';
import { UserService } from './user-service';

const router = Router();

const userController = new UserController(new UserService());

router.use(authMiddleware);

router.get('/me', userController.getUserInfo.bind(userController));
router.get('/', userController.getUsers.bind(userController));

export default router;

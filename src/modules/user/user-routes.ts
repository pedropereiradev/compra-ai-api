import { Router } from "express";
import UserController from "./user-controller";
import { UserService } from "./user-service";

const router = Router();

const userController = new UserController(new UserService());

router.get("/", userController.getUsers.bind(userController));

export default router;

import { Request, Response } from "express";
import { UserService } from "./user-service";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.list();
      res.status(200).send(users);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default UserController;

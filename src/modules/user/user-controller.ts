import type { Request, Response } from 'express';
import type { UserService } from './user-service';

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

  public async getUserInfo(req: Request, res: Response) {
    try {
      //@ts-ignore
      const user = await this.userService.getUserInfo(req.user);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

export default UserController;

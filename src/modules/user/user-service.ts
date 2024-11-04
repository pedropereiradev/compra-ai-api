import { AppDataSource } from '@src/core/config/database/data-source';
import User from './user-model';

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async list() {
    return this.userRepo.find();
  }

  async getUserInfo(user: User) {
    return await this.userRepo.findOne({
      where: { id: user.id },
      select: ['name', 'email', 'telephone'],
    });
  }
}

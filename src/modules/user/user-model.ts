import BaseModel from '@src/core/models/base-model';
import { Column } from 'typeorm';

class User extends BaseModel {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;
}

export default User;

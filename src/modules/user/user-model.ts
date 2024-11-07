import BaseModel from '@src/core/models/base';
import { Column, Entity, OneToMany } from 'typeorm';
import UserList from '../list/user-list-model';

@Entity({ name: 'users' })
class User extends BaseModel {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  telephone: string;

  @Column({ name: 'pix_key', nullable: true })
  pixKey?: string;

  @OneToMany(
    () => UserList,
    (userList) => userList.user,
  )
  userLists: UserList[];
}

export default User;

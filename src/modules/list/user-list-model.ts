import BaseModel from '@src/core/models/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import User from '../user/user-model';
import List from './list-model';

export enum UserListStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Entity({ name: 'users_lists' })
class UserList extends BaseModel {
  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'list_id' })
  listId: number;

  @ManyToOne(
    () => User,
    (user) => user.userLists,
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => List,
    (list) => list.userLists,
  )
  @JoinColumn({ name: 'list_id' })
  list: List;
}

export default UserList;

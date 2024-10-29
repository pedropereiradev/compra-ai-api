import BaseModel from '@src/core/models/base';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import List from '../list/list-model';

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

  @ManyToMany(() => List)
  @JoinTable({
    name: 'users_lists',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'list_id',
      referencedColumnName: 'id',
    },
  })
  lists?: List[];
}

export default User;

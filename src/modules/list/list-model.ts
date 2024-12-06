import BaseModel from '@src/core/models/base';
import { currencyTransformer } from '@src/core/utils/currency-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Item from '../item/item-model';
import User from '../user/user-model';
import UserList from './user-list-model';

@Entity({ name: 'lists' })
class List extends BaseModel {
  @Column()
  name: string;

  @Column()
  emoji: string;

  @Column({
    name: 'total_price',
    type: 'int',
    transformer: currencyTransformer,
    nullable: true,
  })
  totalPrice?: number;

  @Column({
    name: 'max_spend',
    type: 'int',
    transformer: currencyTransformer,
    nullable: true,
  })
  maxSpend?: number | null;

  @Column({ name: 'owner_id' })
  ownerId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(
    () => Item,
    (item) => item.list,
    { nullable: true, cascade: true },
  )
  items?: Item[];

  @OneToMany(
    () => UserList,
    (userList) => userList.list,
  )
  userLists: UserList[];
}

export default List;

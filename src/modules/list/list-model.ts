import BaseModel from '@src/core/models/base';
import { currencyTransformer } from '@src/core/utils/currency-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Item from '../item/item-model';
import User from '../user/user-model';

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
  ownerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(
    () => Item,
    (item) => item.list,
    { nullable: true },
  )
  items?: Item[];

  @ManyToMany(
    () => User,
    (user) => user.lists,
  )
  users?: User[];
}

export default List;

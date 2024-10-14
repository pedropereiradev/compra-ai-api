import BaseModel from '@src/core/models/base';
import { currencyTransformer } from '@src/core/utils/currency-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import Item from '../item/item-model';

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

  @OneToMany(
    () => Item,
    (item) => item.list,
    { nullable: true },
  )
  items?: Item[];
}

export default List;

import BaseModel from '@src/core/models/base';
import { currencyTransformer } from '@src/core/utils/currency-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import List from '../list/list-model';

@Entity({ name: 'items' })
class Item extends BaseModel {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'int', transformer: currencyTransformer, nullable: true })
  price?: number;

  @Column({ type: 'int', nullable: true })
  quantity?: number;

  @Column({ type: 'boolean', default: false })
  checked: boolean;

  @ManyToOne(
    () => List,
    (list) => list.items,
  )
  @JoinColumn({ name: 'list_id' })
  list: List;
}

export default Item;

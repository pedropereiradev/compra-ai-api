import { AppDataSource } from '@src/core/config/database/data-source';
import { InternalError } from '@src/core/errors/internal';
import { NotFoundError } from '@src/core/errors/not-found';
import type { Repository } from 'typeorm';
import List from '../list/list-model';
import type { OverrideListSchema } from '../list/list.request';
import Item from './item-model';
import type { CreateItemSchema } from './item.request';

class ItemService {
  private _repository: Repository<Item>;
  private _listRepository: Repository<List>;

  constructor() {
    this._repository = AppDataSource.getRepository(Item);
    this._listRepository = AppDataSource.getRepository(List);
  }

  async create(payload: CreateItemSchema, listId: string): Promise<Item> {
    try {
      const list = await this._listRepository.findOne({
        where: { id: Number(listId) },
      });

      if (!list) {
        throw new NotFoundError('List not found');
      }

      const item = this._repository.create({
        name: payload.name,
        quantity: payload.quantity,
        price: payload.price ? Number(payload.price) : null,
        unitPrice: null,
        description: payload.description,
        list,
      });

      return await this._repository.save(item);
    } catch (error) {
      console.log(error);
      throw new InternalError(`An Error Occurred: ${error.message}`);
    }
  }

  async checkItem(itemId: string): Promise<Item> {
    const item = await this._repository.findOne({
      where: { id: Number(itemId) },
    });

    if (!item) {
      throw new NotFoundError('Item not found');
    }

    item.checked = !item.checked;
    await this._repository.save(item);

    return item;
  }

  async delete(itemId: string): Promise<void> {
    const item = await this._repository.findOne({
      where: { id: Number(itemId) },
    });

    if (!item) {
      throw new NotFoundError('Item not found');
    }

    await this._repository.remove(item);

    return;
  }

  async update(payload: CreateItemSchema, itemId: string): Promise<Item> {
    const item = await this._repository.findOne({
      where: { id: Number(itemId) },
    });

    if (!item) {
      throw new NotFoundError('Item not found');
    }

    item.name = payload.name;
    item.quantity = payload.quantity;
    item.price = payload.price ? Number(payload.price) : null;
    item.description = payload.description;

    await this._repository.save(item);

    return item;
  }

  async deleteAllItemsFromList(listId: number): Promise<void> {
    const items = await this._repository.find({
      where: { list: { id: listId } },
    });

    if (!items) {
      throw new NotFoundError('Items not found');
    }

    await this._repository.remove(items);

    return;
  }

  async createManyFromReceipt(
    { receiptItems }: OverrideListSchema,
    listId: string,
  ): Promise<Item[]> {
    const list = await this._listRepository.findOne({
      where: { id: Number(listId) },
    });

    if (!list) {
      throw new NotFoundError('List not found');
    }

    const items = await Promise.all(
      receiptItems.map(async (item) => {
        console.log('>>>ITEM', item);
        const createdItem = this._repository.create({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          checked: true,
          measurementUnit: item.measurementUnit,
          unitPrice: item.unitPrice,
          description: item.description,
          list,
        });

        return await this._repository.save(createdItem);
      }),
    );

    return items;
  }
}

export default ItemService;

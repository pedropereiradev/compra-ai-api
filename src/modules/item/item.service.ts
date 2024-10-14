import { AppDataSource } from '@src/core/config/database/data-source';
import { InternalError } from '@src/core/errors/internal';
import { NotFoundError } from '@src/core/errors/not-found';
import type { Repository } from 'typeorm';
import List from '../list/list-model';
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
        description: payload.description,
        list,
      });

      return await this._repository.save(item);
    } catch (error) {
      console.log(error);
      throw new InternalError(`An Error Occurred: ${error.message}`);
    }
  }
}

export default ItemService;

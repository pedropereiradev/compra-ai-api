import { AppDataSource } from '@src/core/config/database/data-source';
import { InternalError } from '@src/core/errors/internal';
import { NotFoundError } from '@src/core/errors/not-found';
import type { Repository } from 'typeorm';
import List from './list-model';
import type { CreateSchema } from './list.request';

class ListService {
  private _repository: Repository<List>;

  constructor() {
    this._repository = AppDataSource.getRepository(List);
  }

  async create(payload: CreateSchema): Promise<List> {
    console.log('payload', payload);
    try {
      const maxSpend = payload.maxSpend ? Number(payload.maxSpend) : null;

      const list = this._repository.create({
        name: payload.name,
        emoji: payload.emoji,
        maxSpend: maxSpend,
        totalPrice: null,
      });

      return await this._repository.save(list);
    } catch (error) {
      console.log(error);
      throw new InternalError(`An Error Occurred: ${error.message}`);
    }
  }

  async findListItems(listId: string): Promise<List> {
    try {
      const list = await this._repository.findOne({
        where: { id: Number(listId) },
        relations: ['items'],
        order: { items: { name: 'ASC' } },
      });

      if (!list) {
        throw new NotFoundError('List not found');
      }

      return list;
    } catch (error) {
      console.log(error);
      throw new InternalError(`An Error Occurred: ${error.message}`);
    }
  }
}

export default ListService;

import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import type { CreateSchema } from './list.request';
import type ListService from './list.service';

class ListController {
  private _service: ListService;

  constructor(service: ListService) {
    this._service = service;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, emoji, maxSpend } = req.body as CreateSchema;

      const response = await this._service.create({ name, emoji, maxSpend });

      return res.status(httpStatus.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async findListItems(req: Request, res: Response, next: NextFunction) {
    try {
      const { listId } = req.params;

      const response = await this._service.findListItems(listId);

      return res.status(httpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default ListController;

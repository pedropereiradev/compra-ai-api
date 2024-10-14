import { CustomError } from '@src/core/errors/custom-error';
import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import type { CreateSchema } from './list.request';
import type ListService from './list.service';

class ListController {
  private _service: ListService;

  constructor(service: ListService) {
    this._service = service;

    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, emoji, maxSpend } = req.body as CreateSchema;

      const response = await this._service.create({ name, emoji, maxSpend });

      return res.status(httpStatus.CREATED).json(response);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ error: error.message });
      }

      next(error);
    }
  }
}

export default ListController;

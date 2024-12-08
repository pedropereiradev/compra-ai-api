import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import type {
  AcceptInviteSchema,
  CreateSchema,
  InviteSchema,
  OverrideListSchema,
} from './list.request';
import type ListService from './list.service';

class ListController {
  private _service: ListService;

  constructor(service: ListService) {
    this._service = service;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, emoji, maxSpend } = req.body as CreateSchema;
      // @ts-ignore
      const userId = req.user.id;

      const response = await this._service.create(userId, {
        name,
        emoji,
        maxSpend,
      });

      return res.status(httpStatus.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async findListItems(req: Request, res: Response, next: NextFunction) {
    try {
      const { listId } = req.params;
      // @ts-ignore
      const userId = req.user.id;

      const response = await this._service.findListItems(listId, userId);

      return res.status(httpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async findLists(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const userId = req.user.id;

      const response = await this._service.findLists(userId);

      return res.status(httpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { listId } = req.params;
      // @ts-ignore
      const userId = req.user.id;

      await this._service.delete(listId, userId);

      return res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { listId } = req.params;
      // @ts-ignore
      const userId = req.user.id;
      const { name, emoji, maxSpend } = req.body as Partial<CreateSchema>;

      const response = await this._service.update(listId, userId, {
        name,
        emoji,
        maxSpend,
      });

      return res.status(httpStatus.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async invite(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const { listId } = req.params;
      const { email } = req.body as InviteSchema;

      const response = await this._service.inviteToList(listId, userId, email);

      return res.status(httpStatus.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async acceptInvite(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const userId = req.user.id;
      const { accepted, inviteId } = req.body as AcceptInviteSchema;

      const response = await this._service.acceptInvitation(
        Number(inviteId),
        userId,
        accepted,
      );

      return res.status(httpStatus.NO_CONTENT).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getPendingInvites(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const userId = req.user.id;

      const response = await this._service.getPendingInvitations(userId);

      return res.status(httpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async finishList(req: Request, res: Response, next: NextFunction) {
    try {
      const { listId } = req.params;
      const receiptItems = req.body as OverrideListSchema;
      // @ts-ignore
      const userId = req.user.id;

      const response = await this._service.finishList(
        listId,
        userId,
        receiptItems,
      );

      return res.status(httpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default ListController;

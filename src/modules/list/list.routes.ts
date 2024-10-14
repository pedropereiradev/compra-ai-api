import { validateRequest } from '@src/core/middlewares/validate-request.middleware';
import { Router } from 'express';
import ListController from './list.controller';
import { createSchema } from './list.request';
import ListService from './list.service';

const router = Router();

const listService = new ListService();
const listController = new ListController(listService);

router.post(
  '/',
  validateRequest(createSchema),
  listController.create.bind(listController),
);
router.get('/items/:listId', listController.findListItems.bind(listController));

export default router;

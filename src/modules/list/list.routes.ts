import { authMiddleware } from '@src/core/middlewares/auth.middleware';
import { validateRequest } from '@src/core/middlewares/validate-request.middleware';
import { Router } from 'express';
import ListController from './list.controller';
import {
  acceptInviteSchema,
  createSchema,
  inviteSchema,
  overrideListSchema,
  updateSchema,
} from './list.request';
import ListService from './list.service';

const router = Router();

const listService = new ListService();
const listController = new ListController(listService);

router.use(authMiddleware);

router.get('/', listController.findLists.bind(listController));
router.get('/items/:listId', listController.findListItems.bind(listController));
router.get(
  '/invites/pending',
  listController.getPendingInvites.bind(listController),
);

router.post(
  '/',
  validateRequest(createSchema),
  listController.create.bind(listController),
);
router.post(
  '/invite/accept',
  validateRequest(acceptInviteSchema),
  listController.acceptInvite.bind(listController),
);
router.post(
  '/invite/:listId',
  validateRequest(inviteSchema),
  listController.invite.bind(listController),
);
router.post(
  '/finish/:listId',
  validateRequest(overrideListSchema),
  listController.finishList.bind(listController),
);

router.put(
  '/:listId',
  validateRequest(updateSchema),
  listController.update.bind(listController),
);

router.delete('/:listId', listController.delete.bind(listController));

export default router;

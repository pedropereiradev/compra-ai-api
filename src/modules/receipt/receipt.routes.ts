import { authMiddleware } from '@src/core/middlewares/auth.middleware';
import { Router } from 'express';
import multer from 'multer';
import ReceiptController from './receipt.controller';
import ReceiptService from './receipt.service';

const router = Router();

const receiptService = new ReceiptService();
const receiptController = new ReceiptController(receiptService);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed'));
      return;
    }
    cb(null, true);
  },
});

router.use(authMiddleware);

router.post(
  '/upload-receipt',
  upload.array('receipt', 5),
  receiptController.uploadReceipt.bind(receiptController),
);

export default router;

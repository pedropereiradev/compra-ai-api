import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import type ReceiptService from './receipt.service';

class ReceiptController {
  private _service: ReceiptService;

  constructor(service: ReceiptService) {
    this._service = service;
  }

  async uploadReceipt(req: Request, res: Response, next: NextFunction) {
    try {
      //@ts-ignore
      const userId = req.user.id;
      //@ts-ignore
      const files = req.files as Express.Multer.File[];

      //@ts-ignore
      if (!files || files.length === 0) {
        return res.status(httpStatus.BAD_REQUEST).json({
          message: 'Please upload a file',
        });
      }

      //@ts-ignore
      const response = await this._service.create(userId, files);

      return res.status(httpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default ReceiptController;

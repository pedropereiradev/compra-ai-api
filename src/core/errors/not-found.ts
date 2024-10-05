import httpStatus from 'http-status';
import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super(httpStatus.NOT_FOUND, message);
  }
}

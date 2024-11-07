import httpStatus from 'http-status';
import { CustomError } from './custom-error';

export class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden') {
    super(httpStatus.FORBIDDEN, message);
  }
}

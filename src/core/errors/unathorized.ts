import httpStatus from 'http-status';
import { CustomError } from './custom-error';

export class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized') {
    super(httpStatus.UNAUTHORIZED, message);
  }
}

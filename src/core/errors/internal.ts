import httpStatus from 'http-status';
import { CustomError } from './custom-error';

export class InternalError extends CustomError {
  constructor(message = 'Internal Server Error') {
    super(httpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

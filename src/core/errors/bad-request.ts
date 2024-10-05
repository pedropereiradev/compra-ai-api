import httpStatus from 'http-status';
import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  constructor(message = 'Bad Request') {
    super(httpStatus.BAD_REQUEST, message);
  }
}

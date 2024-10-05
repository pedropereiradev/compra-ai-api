export class CustomError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);

    this.name = this.constructor.name;
    this.status = status;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

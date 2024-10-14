import type { Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorMiddleware = (err: Error, _req: Request, res: Response) => {
  console.log({ err, res });
  if (err instanceof CustomError) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err);

  return res.status(500).json({ error: `Internal Server Error: ${err}` });
};

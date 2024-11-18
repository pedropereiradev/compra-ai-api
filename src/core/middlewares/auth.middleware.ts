import type { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import type { JwtPayload } from 'jsonwebtoken';
import { verifyAccessToken } from '../utils/jwt';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ error: 'No token provided' });
  }

  const decoded = verifyAccessToken(token) as JwtPayload | null;

  if (!decoded) {
    return res.status(httpStatus.FORBIDDEN).json({ error: 'Invalid token' });
  }

  // @ts-ignore
  req.user = decoded as Express.Request['user'];
  next();
};

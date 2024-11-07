import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const decoded = verifyToken(token) as JwtPayload | null;

  if (!decoded) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // @ts-ignore
  req.user = decoded as Express.Request['user'];
  next();
};

import jwt, { type JwtPayload } from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'jwt_secret';
const JWT_REFRESH_SECRET_KEY =
  process.env.JWT_REFRESH_SECRET_KEY || 'jwt_refresh_secret';

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ id: userId }, JWT_SECRET_KEY, { expiresIn: '30m' });
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ id: userId }, JWT_REFRESH_SECRET_KEY, { expiresIn: '30d' });
};

export const verifyAccessToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET_KEY) as JwtPayload;
  } catch (error) {
    return null;
  }
};

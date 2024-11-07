import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'jwt_secret';

export const generateAccessToken = (userId: number) => {
  return jwt.sign({ id: userId }, JWT_SECRET_KEY, { expiresIn: '30m' });
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ id: userId }, JWT_SECRET_KEY, { expiresIn: '30d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    return null;
  }
};

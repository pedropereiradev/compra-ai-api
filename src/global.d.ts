import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        iat?: number;
        exp?: number;
      };
    }
  }
}

//biome-ignore lint: necessary for module augmentation
export {};

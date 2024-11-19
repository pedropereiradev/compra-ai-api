import cors from 'cors';
import express, { type Request, type Response } from 'express';
import httpStatus from 'http-status';
import morgan from 'morgan';
import { errorMiddleware } from './core/middlewares/error.middleware';
import authRoutes from './modules/auth/auth.routes';
import itemRoutes from './modules/item/item.routes';
import listRoutes from './modules/list/list.routes';
// import receiptRoutes from './modules/receipt/receipt.routes';
import userRoutes from './modules/user/user-routes';

async function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));

  app.get('/api/ping', (_req, res) => {
    res.status(httpStatus.OK).send({ ping: 'pong' });
  });

  app.use('/api/item', itemRoutes);
  app.use('/api/list', listRoutes);
  // app.use('/api/receipt', receiptRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);

  app.use((req: Request, res: Response) => {
    console.log('NOT FOUND ROUTE: ', req.path);
    res.status(httpStatus.NOT_FOUND).json({ error: 'Route Not Found' });
  });

  app.use(errorMiddleware);

  return app;
}

export default createApp;

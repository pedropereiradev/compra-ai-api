import cors from 'cors';
import express from 'express';
import { errorMiddleware } from './core/middlewares/error.middleware';
import itemRoutes from './modules/item/item.routes';
import listRoutes from './modules/list/list.routes';
import receiptRoutes from './modules/receipt/receipt.routes';

async function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(errorMiddleware);

  app.get('/api', (_req, res) => {
    res.send('Hello World');
  });

  app.use('/api/item', itemRoutes);
  app.use('/api/list', listRoutes);
  app.use('/api/receipt', receiptRoutes);

  return app;
}

export default createApp;

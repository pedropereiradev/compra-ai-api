import * as dotenv from 'dotenv';
import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './core/config/database/data-source';

dotenv.config();

const PORT = process.env.NODE_PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('Error in database connection: ', error));

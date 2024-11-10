import 'module-alias/register';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import createApp from './app';
import { initializeDataSource } from './core/config/database/data-source';

dotenv.config();

const PORT = process.env.NODE_PORT || 3001;

async function startServer() {
  try {
    await initializeDataSource();
    const app = await createApp();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

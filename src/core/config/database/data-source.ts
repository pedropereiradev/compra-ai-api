import path from 'node:path';
import dotenv from 'dotenv';
import { DataSource, type DataSourceOptions } from 'typeorm';

dotenv.config();

const entitiesDir = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'modules',
  '**',
  '*-model.{ts,js}',
);

const migrationsDir = path.resolve(__dirname, 'migrations', '**', '*.{ts,js}');

export const dbOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  entities: [entitiesDir],
  migrations: [migrationsDir],
};

export const AppDataSource = new DataSource(dbOptions);

export const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize();
    console.log('[DATABASE]: Database Connection established');
  } catch (error) {
    console.error('Error during Data Source initialization', error);
    throw error;
  }
};

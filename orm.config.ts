import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'pass',
  database: process.env.DB_NAME || 'development',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
  subscribers: [],
};

export const TestDataSourceConfig: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
  subscribers: [],
};

const config =
  process.env.NODE_ENV === 'test' ? TestDataSourceConfig : AppDataSourceConfig;

export const AppDataSource = new DataSource(config);

export default config;

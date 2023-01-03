import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestDataSourceConfig } from '../orm.config';
import { DataSource } from 'typeorm';

describe('Database Connection', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TestDataSourceConfig)],
    }).compile();

    dataSource = module.get<DataSource>(DataSource);
  });

  it('should resolve the DataSource provider', () => {
    expect(dataSource).toBeDefined();
  });

  it('should connect to the database', async () => {
    expect(dataSource.isInitialized).toBe(true);
  });

  it('should run a query', async () => {
    const result = await dataSource.query('SELECT 1 + 1 AS result');
    expect(parseInt(result[0].result)).toBe(2);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestDataSourceConfig } from '../../orm.config';

describe('UsersService', () => {
  let usersService: UsersService;
  let databaseService: DataSource;
  let userId: number;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TestDataSourceConfig)],
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    databaseService = module.get<DataSource>(DataSource);
  });

  it('should add a new user', async () => {
    const user = await usersService.create({
      parkingId: 1,
      username: 'john.doe',
      password: '123456',
    });
    userId = user.id;
    expect(user).toHaveProperty('id');
  });

  it('should return a list of users', async () => {
    const users = await usersService.findAll();
    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should return a user by id', async () => {
    const user = await usersService.findOne(userId);
    expect(user).toBeDefined();
    expect(user).toHaveProperty('id');
  });

  it('should return a user by username', async () => {
    const user = await usersService.findByUsername('john.doe');
    expect(user).toBeDefined();
    expect(user).toHaveProperty('id');
  });

  it('should update a user by id', async () => {
    const user = await usersService.update(userId, {
      username: 'john.does',
    });
    expect(user).toHaveProperty('id');
    expect(user.username).toBe('john.does');
  });

  it('should remove a user by id', async () => {
    await usersService.remove(userId);
    expect(() => usersService.findOne(userId)).rejects.toThrow();
  });

  afterAll(async () => {
    await databaseService.destroy();
  });
});

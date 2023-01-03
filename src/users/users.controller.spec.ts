import { TestDataSourceConfig } from '@/orm.config';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TestDataSourceConfig)],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should throw ForbiddenException when trying to create a user with an existing username', async () => {
    const username = 'test';
    const password = 'test';
    await controller.create({ username, password, parkingId: 0 });
    await expect(
      controller.create({ username, password, parkingId: 0 }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('should throw NotFoundException when trying to update a user that does not exist', async () => {
    await expect(controller.update('1', { parkingId: 1 })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw NotFoundException when trying to delete a user that does not exist', async () => {
    await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
  });
});

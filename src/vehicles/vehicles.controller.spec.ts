import { TestDataSourceConfig } from '@/orm.config';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { vehicleFixture } from './vehicles.service.spec';

describe('VehiclesController', () => {
  let controller: VehiclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TestDataSourceConfig)],
      controllers: [VehiclesController],
      providers: [VehiclesService],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
  });

  it('should throw ForbiddenException when trying to create a vehicle with an existing plate', async () => {
    await controller.create(vehicleFixture);
    await expect(controller.create(vehicleFixture)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should throw NotFoundException when trying to update a vehicle that does not exist', async () => {
    await expect(controller.update('1', { color: 'black' })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw NotFoundException when trying to delete a vehicle that does not exist', async () => {
    await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
  });
});

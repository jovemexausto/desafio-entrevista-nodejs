import { TestDataSourceConfig } from '@/orm.config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehiclesService } from './vehicles.service';

export const vehicleFixture: CreateVehicleDto = {
  type: 'car',
  make: 'Ford',
  model: 'F-150',
  year: 2018,
  color: 'white',
  plate: 'ABC1234',
};

describe('VehiclesService', () => {
  let service: VehiclesService;
  let dataSource: DataSource;
  let vehicleId: number;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TestDataSourceConfig)],
      providers: [VehiclesService],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should add a new vehicle', async () => {
    const vehicle = await service.create(vehicleFixture);
    vehicleId = vehicle.id;
    expect(vehicle).toHaveProperty('id');
    expect(vehicle.year).toBe(2018);
  });

  it('should return a list of vehicles', async () => {
    const vehicles = await service.findAll();
    expect(vehicles).toBeDefined();
    expect(vehicles.length).toBeGreaterThan(0);
  });

  it('should return a vehicle by id', async () => {
    const vehicle = await service.findOne(vehicleId);
    expect(vehicle).toBeDefined();
    expect(vehicle).toHaveProperty('id');
  });

  it('should return a vehicle by plate', async () => {
    const vehicle = await service.findByPlate(vehicleFixture.plate);
    expect(vehicle).toBeDefined();
    expect(vehicle).toHaveProperty('id');
  });

  it('should update a vehicle by id', async () => {
    const vehicle = await service.update(vehicleId, {
      year: 2019,
    });
    expect(vehicle).toBeDefined();
    expect(vehicle).toHaveProperty('id');
    expect(vehicle.year).toBe(2019);
  });

  it('should remove a vehicle by id', async () => {
    await service.remove(vehicleId);
    expect(() => service.findOne(vehicleId)).rejects.toThrowError();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});

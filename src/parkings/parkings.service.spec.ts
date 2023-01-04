import { TestDataSourceConfig } from '@/orm.config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { vehicleFixture } from 'src/vehicles/vehicles.service.spec';
import { DataSource } from 'typeorm';
import { TicketsService } from '../tickets/tickets.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { ParkingsService } from './parkings.service';

const parkingFixture: CreateParkingDto = {
  name: 'Estacionamento do João',
  cnpj: '12345678901234',
  address: 'Rua dos Estacionamentos, 0',
  phone: '11999999999',
  carSpaces: 100,
  motorcycleSpaces: 100,
};

describe('ParkingsService', () => {
  let parkingService: ParkingsService;
  let vehicleService: VehiclesService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TestDataSourceConfig)],
      providers: [ParkingsService, VehiclesService, TicketsService],
    }).compile();

    parkingService = module.get<ParkingsService>(ParkingsService);
    vehicleService = module.get<VehiclesService>(VehiclesService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should add a new parking', async () => {
    const parking = await parkingService.create(parkingFixture);
    expect(parking).toHaveProperty('id');
  });

  it('should return a list of parkings', async () => {
    const parkings = await parkingService.findAll();
    expect(parkings.length).toBeGreaterThan(0);
  });

  it('should return a parking by id', async () => {
    const parking = await parkingService.findOne(1);
    expect(parking.id).toBe(1);
  });

  it('should update a parking by id', async () => {
    const parking = await parkingService.update(1, {
      name: 'Estacionamento XYZ',
    });
    expect(parking.name).toContain('XYZ');
  });

  it('should remove a parking by id', async () => {
    await parkingService.remove(1);
    expect(parkingService.findOne(1)).rejects.toThrow();
  });

  it('should return a list of vehicles in a parking', async () => {
    jest
      .spyOn(vehicleService, 'findAllByIds')
      .mockImplementation(async () => [{ ...vehicleFixture, id: 1 }]);

    const vehicles = await parkingService.getVehiclesParkedAt(1);
    expect(vehicles.length).toBeGreaterThan(0);
  });

  it('should decrease the number of available spaces when a vehicle enters', async () => {
    jest
      .spyOn(parkingService, 'findOne')
      .mockImplementation(async () => ({ ...parkingFixture, id: 1 }));
    jest
      .spyOn(parkingService, 'getVehiclesParkedAt')
      .mockImplementation(async () => [{ ...vehicleFixture, id: 1 }]);
    const { carSpaces } = await parkingService.getAvailableSpacesAt(1);
    expect(carSpaces).toBe(parkingFixture.carSpaces - 1);
  });

  it('should increase the number of available spaces when a vehicle exits', async () => {
    jest
      .spyOn(parkingService, 'getVehiclesParkedAt')
      .mockImplementation(async () => []);
    const { carSpaces } = await parkingService.getAvailableSpacesAt(1);
    expect(carSpaces).toBe(parkingFixture.carSpaces);
  });

  it('should return the right count of available space for each type of vehicle', async () => {
    jest
      .spyOn(parkingService, 'findOne')
      .mockImplementation(async () => ({ ...parkingFixture, id: 1 }));
    jest
      .spyOn(parkingService, 'getVehiclesParkedAt')
      .mockImplementation(async () => [{ ...vehicleFixture, id: 1 }]);
    const { carSpaces, motorcycleSpaces } =
      await parkingService.getAvailableSpacesAt(1);
    expect(carSpaces).toBe(parkingFixture.carSpaces - 1);
    expect(motorcycleSpaces).toBe(parkingFixture.motorcycleSpaces);
  });

  it('should return a ticket when a vehicle enters', async () => {
    jest
      .spyOn(vehicleService, 'findOne')
      .mockImplementation(async () => ({ ...vehicleFixture, id: 1 }));
    jest
      .spyOn(parkingService, 'getVehiclesParkedAt')
      .mockImplementation(async () => []);
    const ticket = await parkingService.parkVehicleAt(1, 1);
    expect(ticket).toHaveProperty('parkingId');
    expect(ticket).toHaveProperty('vehicleId');
    expect(ticket).toHaveProperty('enteredAt');
  });

  it('should throw an error when a vehicle enters a parking with no available spaces for its type', async () => {
    jest
      .spyOn(parkingService, 'getAvailableSpacesAt')
      .mockImplementation(async () => ({
        carSpaces: 0,
        motorcycleSpaces: 0,
      }));
    await expect(parkingService.parkVehicleAt(1, 1)).rejects.toThrowError();
  });

  it('should throw an error if a vehicle tries to enter an already entered parking', async () => {
    jest
      .spyOn(parkingService, 'getVehiclesParkedAt')
      .mockImplementation(async () => [{ ...vehicleFixture, id: 1 }]);
    jest
      .spyOn(parkingService, 'getAvailableSpacesAt')
      .mockImplementation(async () => ({
        carSpaces: 1,
        motorcycleSpaces: 1,
      }));

    await expect(parkingService.parkVehicleAt(1, 1)).rejects.toThrowError();
  });

  it('should return the right count of available space for each type of vehicle', async () => {
    jest.restoreAllMocks();
    jest
      .spyOn(parkingService, 'findOne')
      .mockImplementation(async () => ({ ...parkingFixture, id: 1 }));
    jest
      .spyOn(parkingService, 'getVehiclesParkedAt')
      .mockImplementation(async () => [{ ...vehicleFixture, id: 1 }]);

    const { carSpaces, motorcycleSpaces } =
      await parkingService.getAvailableSpacesAt(1);
    expect(carSpaces).toBe(parkingFixture.carSpaces - 1);
    expect(motorcycleSpaces).toBe(parkingFixture.motorcycleSpaces);
  });

  it('should return a ticket when a vehicle enters', async () => {
    jest
      .spyOn(vehicleService, 'findOne')
      .mockImplementation(async () => ({ ...vehicleFixture, id: 1 }));
    jest
      .spyOn(parkingService, 'getVehiclesParkedAt')
      .mockImplementation(async () => []);
    const ticket = await parkingService.parkVehicleAt(1, 1);
    expect(ticket).toHaveProperty('parkingId');
    expect(ticket).toHaveProperty('vehicleId');
    expect(ticket).toHaveProperty('enteredAt');
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});

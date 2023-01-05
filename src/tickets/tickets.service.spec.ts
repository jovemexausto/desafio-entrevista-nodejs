import { TestDataSourceConfig } from '@/orm.config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';

const ticketFixture: CreateTicketDto = {
  parkingId: 1,
  vehicleId: 1,
  vehicleType: 'car',
};

describe('TicketsService', () => {
  let service: TicketsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TestDataSourceConfig)],
      providers: [TicketsService],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should add a new ticket', async () => {
    const ticket = await service.create(ticketFixture as CreateTicketDto);
    expect(ticket).toHaveProperty('id');
  });

  it('should return a list of tickets', async () => {
    const tickets = await service.findAll();
    expect(tickets).toBeDefined();
    expect(tickets.length).toBeGreaterThan(0);
  });

  it('should return a ticket by id', async () => {
    const ticket = await service.findOne(1);
    expect(ticket).toBeDefined();
    expect(ticket.id).toBe(1);
  });

  it('should update a ticket by id', async () => {
    const ticket = await service.update(1, {
      status: 'exited',
    });
    expect(ticket).toBeDefined();
    expect(ticket).toHaveProperty('id');
  });

  it('should return a list of tickets by parking id', async () => {
    const tickets = await service.findAllByParkingId(1);
    expect(tickets).toBeDefined();
    expect(tickets.length).toBeGreaterThan(0);
  });

  it('should return a list of tickets by vehicle id', async () => {
    const tickets = await service.findAllByVehicleId(1);
    expect(tickets).toBeDefined();
    expect(tickets.length).toBeGreaterThan(0);
  });

  it('should remove a ticket by id', async () => {
    await service.remove(1);
    expect(service.findOne(1)).rejects.toThrow();
  });
});

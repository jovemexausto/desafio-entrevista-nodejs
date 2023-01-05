import { TestDataSourceConfig } from '@/orm.config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { TicketsService } from 'src/tickets/tickets.service';
import { generateTickets } from 'test/fixtures/tickets.fixture';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let service: ReportsService;
  let ticketsService: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TestDataSourceConfig)],
      providers: [ReportsService, TicketsService],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    ticketsService = module.get<TicketsService>(TicketsService);
  });

  it('should return a report with the correct values', async () => {
    jest.spyOn(ticketsService, 'findAllByParkingId').mockImplementation(
      async () =>
        generateTickets({
          ticketStatus: 'entered',
          vehicleIdStart: 1,
          numTickets: 10,
          ticketInterval: 86400000 * 2, // 2 days
          interpolateVehicleType: true,
        }) as Partial<Ticket>[],
    );

    const result = await service.summary(1);
    expect(result.ticketsCount).toBe(10);
    expect(result.ticketsCarCount).toBe(5);
    expect(result.ticketsMotorcycleCount).toBe(5);
    expect(result.ticketsEnteredCount).toBe(10);
    expect(result.ticketsExitedCount).toBe(0);
  });

  it('should return a hourly report with the correct values', async () => {
    jest.spyOn(ticketsService, 'findAllByParkingId').mockImplementation(
      async () =>
        generateTickets({
          ticketStatus: 'entered',
          vehicleIdStart: 1,
          numTickets: 100,
          ticketInterval: 86400000 / 48, // 30 minutes
        }) as Partial<Ticket>[],
    );
    const hourlySummary = await service.hourlySummary(1);
    expect(Object.keys(hourlySummary).length).toBeGreaterThan(0);
  });
});

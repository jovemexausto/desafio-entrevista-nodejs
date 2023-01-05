import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TicketsService } from 'src/tickets/tickets.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, TicketsService],
})
export class ReportsModule {}

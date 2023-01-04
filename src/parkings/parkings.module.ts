import { Module } from '@nestjs/common';
import { ParkingsService } from './parkings.service';
import { ParkingsController } from './parkings.controller';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { TicketsService } from 'src/tickets/tickets.service';

@Module({
  controllers: [ParkingsController],
  providers: [ParkingsService, VehiclesService, TicketsService],
})
export class ParkingsModule {}

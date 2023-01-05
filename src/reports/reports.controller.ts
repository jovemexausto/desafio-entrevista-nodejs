import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('/parkings/:parkingId')
  summary(@Param('parkingId') parkingId: number) {
    return this.reportsService.summary(parkingId);
  }

  @Get('/parkings/:parkingId/hourly')
  hourlySummary(@Param('parkingId') parkingId: number) {
    return this.reportsService.hourlySummary(parkingId);
  }
}

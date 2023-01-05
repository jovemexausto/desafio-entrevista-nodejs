import { Controller, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HourlySummary, Summary } from './reports.decorator';
import { ReportsService } from './reports.service';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOperation({ summary: 'Gets the summary of a parking' })
  @Summary()
  summary(@Param('parkingId') parkingId: number) {
    return this.reportsService.summary(parkingId);
  }

  @ApiOperation({ summary: 'Gets the hourly summary of a parking' })
  @HourlySummary()
  hourlySummary(@Param('parkingId') parkingId: number) {
    return this.reportsService.hourlySummary(parkingId);
  }
}

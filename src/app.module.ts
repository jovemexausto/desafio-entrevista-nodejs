import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DataSourceConfig from '../orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ParkingsModule } from './parkings/parkings.module';
import { TicketsModule } from './tickets/tickets.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    AuthModule,
    VehiclesModule,
    ParkingsModule,
    TicketsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

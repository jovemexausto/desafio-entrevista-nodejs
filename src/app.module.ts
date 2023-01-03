import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSourceConfig } from '../orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSourceConfig),
    UsersModule,
    AuthModule,
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

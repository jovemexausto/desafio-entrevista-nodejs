import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSourceConfig } from '../orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSourceConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

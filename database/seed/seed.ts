import { AppDataSourceConfig } from '@/orm.config';
import { Parking } from 'src/parkings/entities/parking.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { ParkingsSeed } from './parkings';
import { UsersSeed } from './users';

const DataSourceConfig = {
  ...AppDataSourceConfig,
  entities: [User, Parking],
};

const DataSouce = new DataSource(DataSourceConfig);

(async () => {
  await DataSouce.initialize();

  await new ParkingsSeed(DataSouce).seed();
  await new UsersSeed(DataSouce).seed();

  await DataSouce.destroy();
})();

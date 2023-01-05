import { DataSource, In } from 'typeorm';
import { User } from '../../src/users/entities/user.entity';

const users: Partial<User>[] = [
  {
    id: 1,
    username: 'rootuser',
    password: 'rootpassword',
    role: 'root',
  },
  {
    id: 2,
    parkingId: 1,
    username: 'john.doe',
    password: 'password',
    role: 'admin',
  },
];

export class UsersSeed {
  private DataSouce: DataSource;

  constructor(DataSouce: DataSource) {
    this.DataSouce = DataSouce;
  }

  public async seed(): Promise<void> {
    const existingUsers = await User.findBy({
      id: In(users.map((parking) => parking.id)),
    });

    if (existingUsers.length > 0) {
      console.log('Users already seeded');
      return;
    }

    await Promise.all(
      users.map(async (user) => {
        const usr = new User();
        Object.assign(usr, user);
        await usr.save();
      }),
    );

    console.log('Users seeded');
  }
}

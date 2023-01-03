import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  findAll() {
    return User.find();
  }

  findOne(id: number) {
    return User.findOneOrFail({
      where: {
        id,
      },
    });
  }

  findByUsername(username: string): Promise<Partial<User>> {
    return User.findOneOrFail({
      where: {
        username,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    Object.assign(user, createUserDto);
    return await user.save();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await User.findOneOrFail({
      where: {
        id,
      },
    });

    Object.assign(user, updateUserDto);

    return user.save();
  }

  remove(id: number) {
    return User.delete(id);
  }
}

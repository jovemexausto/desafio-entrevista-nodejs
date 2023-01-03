import { Controller, Body, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForbiddenException } from '@nestjs/common';
import {
  CreateUser,
  DeleteUser,
  FindUser,
  ListUsers,
  UpdateUser,
} from './users.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CreateUser()
  @ApiOperation({ summary: 'Creates a user' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new ForbiddenException('Username already exists');
    }
  }

  @ListUsers()
  @ApiOperation({ summary: 'Lists all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @FindUser()
  @ApiOperation({ summary: 'Finds a user by id' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @UpdateUser()
  @ApiOperation({ summary: 'Updates a user by id' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @DeleteUser()
  @ApiOperation({ summary: 'Deletes a user by id' })
  async remove(@Param('id') id: string) {
    const deleteResult = await this.usersService.remove(+id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException();
    }
  }
}

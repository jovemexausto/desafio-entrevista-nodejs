import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async authenticate(authDto: AuthDto) {
    const user = await this.usersService.findByUsername(authDto.username);
    return user ? this.jwtService.sign(omit(user, 'password')) : null;
  }
}

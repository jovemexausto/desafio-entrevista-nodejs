import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

    jest
      .spyOn(usersService, 'findByUsername')
      .mockImplementation(async (username) => {
        return {
          id: 1,
          password: 'password',
          username,
        };
      });
  });

  it('should create a JWT token', async () => {
    const token = await authService.authenticate({
      username: 'john.doe',
      password: 'password',
    });
    expect(token).toMatch(
      /^[a-zA-Z0-9-_=]+.[a-zA-Z0-9-_=]+.[a-zA-Z0-9-_.+/=]*$/,
    );
  });

  it('should get a payload from a JWT token', async () => {
    const token = await authService.authenticate({
      username: 'john.doe',
      password: 'password',
    });

    const payload = jwtService.verify(token);
    expect(payload).toHaveProperty('id');
    expect(payload).toHaveProperty('iat');
    expect(payload).toHaveProperty('exp');
  });
});

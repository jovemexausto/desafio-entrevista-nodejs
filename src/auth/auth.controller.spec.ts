import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';

describe('AuthController', () => {
  let usersService: UsersService;
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    authController = module.get<AuthController>(AuthController);
  });

  it('should throw an error for invalid credentials', async () => {
    jest.spyOn(usersService, 'findByUsername').mockImplementation(() => null);

    expect(
      authController.login({ username: 'test', password: 'test' }),
    ).rejects.toThrow();
  });
});

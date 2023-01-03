import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth';
import { TokenDto } from './dto/token';
import { Public } from './jwt.guard';

@Public()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiParam({
    name: 'authDto',
    description: 'The users login credentials',
    type: AuthDto,
  })
  @ApiCreatedResponse({
    description: 'The users login token',
    type: TokenDto,
  })
  async login(@Body() authDto: AuthDto) {
    const token = await this.authService.authenticate(authDto);
    if (null === token) {
      throw new UnauthorizedException();
    }
    return {
      token,
    };
  }
}

import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtOptions: JwtModuleOptions = Object.freeze({
  secret: 'secret',
  signOptions: { expiresIn: '7d' },
});

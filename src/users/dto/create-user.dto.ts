import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  /**
   * The user's username
   * @example 'johndoe'
   */
  @IsNotEmpty()
  username: string;
  /**
   * The user's password
   * @example '123456'
   */
  @IsNotEmpty()
  password: string;
  /**
   * The user's parking reference
   * @example '1'
   */
  @IsOptional()
  parkingId?: number;

  /**
   * The user's role, default is 'admin'
   * @example 'root'
   */
  @IsOptional()
  role?: string;
}

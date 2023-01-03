import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { Vehicle } from '../entities/vehicle.entity';

export class CreateVehicleDto {
  /**
   * The plate of the vehicle
   * @example 'ABC1234'
   */
  @ApiProperty({ pattern: '^[a-zA-Z]{3}[0-9]{4}$' })
  @IsNotEmpty()
  plate: string;

  /**
   * The make of the vehicle
   * @example 'Ford'
   */
  @IsNotEmpty()
  make: string;

  /**
   * The model of the vehicle
   * @example 'Fiesta'
   */
  @IsNotEmpty()
  model: string;

  /**
   * The color of the vehicle
   * @example 'red'
   */
  @IsNotEmpty()
  color: string;

  /**
   * The year of the vehicle
   * @example 2019
   */
  @IsInt()
  year: number;

  /**
   * The type of the vehicle
   * @example 'car'
   */
  @ApiProperty({ enum: Vehicle.types })
  @IsEnum(Vehicle.types)
  type: string;
}

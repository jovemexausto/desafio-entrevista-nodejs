import { IsNotEmpty } from 'class-validator';

export class CreateParkingDto {
  /**
   * The name of the parking
   * @example 'Estacionamento do João'
   */
  @IsNotEmpty()
  name: string;

  /**
   * The CNPJ of the parking
   * @example '12345678901234'
   * @pattern ^\d{14}$
   */
  @IsNotEmpty()
  cnpj: string;

  /**
   * The address of the parking
   * @example 'Rua dos Bobos, 0'
   */
  @IsNotEmpty()
  address: string;

  /**
   * The phone number of the parking
   * @example '11999999999'
   */
  @IsNotEmpty()
  phone: string;

  /**
   * The number of car spaces of the parking
   * @example 100
   */
  @IsNotEmpty()
  carSpaces: number;

  /**
   * The number of motorcycle spaces of the parking
   * @example 100
   */
  @IsNotEmpty()
  motorcycleSpaces: number;
}

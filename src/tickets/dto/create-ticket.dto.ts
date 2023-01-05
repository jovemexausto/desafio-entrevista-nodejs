export class CreateTicketDto {
  /**
   * The type of the vehicle
   * @example 'car'
   */
  vehicleType: 'car' | 'motorcycle';

  /**
   * The id of the vehicle
   * @example 1
   */
  vehicleId: number;

  /**
   * The id of the parking
   * @example 1
   */
  parkingId: number;
}

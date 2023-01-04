import { PartialType } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  /**
   * The status of the ticket
   * @example 'entered'
   */
  status?: 'entered' | 'exited';

  /**
   * The date when the ticket was entered
   * @example '2021-01-01T00:00:00.000Z'
   */
  enteredAt?: Date;

  /**
   * The date when the ticket was exited
   * @example '2021-01-01T00:00:00.000Z'
   */
  exitedAt?: Date;
}

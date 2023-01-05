import { Controller, Body, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateTicket,
  DeleteTicket,
  FindTicket,
  ListTickets,
  UpdateTicket,
} from './tickets.decorator';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @CreateTicket()
  @ApiOperation({ summary: 'Creates a ticket' })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @ListTickets()
  @ApiOperation({ summary: 'Lists all tickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @FindTicket()
  @ApiOperation({ summary: 'Finds a ticket by id' })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @UpdateTicket()
  @ApiOperation({ summary: 'Updates a ticket by id' })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @DeleteTicket()
  @ApiOperation({ summary: 'Deletes a ticket by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}

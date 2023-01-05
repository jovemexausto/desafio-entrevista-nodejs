import { Delete, Get, HttpCode, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { applyDecorators } from '@nestjs/common';

const parameterId = ':id';

export function CreateTicket() {
  return applyDecorators(
    Post(),
    HttpCode(201),
    ApiParam({
      name: 'createTicketDto',
      description: 'The ticket to create',
      type: CreateTicketDto,
    }),
    ApiCreatedResponse({
      description: 'The ticket has been successfully created.',
      type: Ticket,
    }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
  );
}

export function ListTickets() {
  return applyDecorators(
    Get(),
    ApiResponse({
      status: 200,
      description: 'The list of tickets',
      isArray: true,
      type: Ticket,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden.',
    }),
  );
}

export function FindTicket(): MethodDecorator {
  return applyDecorators(
    Get(parameterId),
    ApiParam({
      name: 'id',
      description: 'The ticket id',
      type: Number,
    }),
    ApiResponse({
      status: 200,
      description: 'The ticket',
      type: Ticket,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden.',
    }),
  );
}

export function UpdateTicket(): MethodDecorator {
  return applyDecorators(
    Patch(parameterId),
    ApiParam({
      name: 'id',
      description: 'The ticket id',
      type: Number,
    }),
    ApiOkResponse({
      description: 'The ticket has been successfully updated.',
      type: Ticket,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden.',
    }),
  );
}

export function DeleteTicket(): MethodDecorator {
  return applyDecorators(
    Delete(parameterId),
    HttpCode(204),
    ApiNoContentResponse({
      description: 'The ticket has been successfully deleted.',
    }),
    ApiForbiddenResponse({
      description: 'Forbidden.',
    }),
  );
}

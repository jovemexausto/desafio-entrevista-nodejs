import { Delete, Get, HttpCode, Patch, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateParkingDto } from './dto/create-parking.dto';
import { Parking } from './entities/parking.entity';
import { applyDecorators } from '@nestjs/common';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { CreateVehicleDto } from 'src/vehicles/dto/create-vehicle.dto';

const parameterId = ':id';

export function CreateParking() {
  return applyDecorators(
    Post(),
    HttpCode(201),
    ApiParam({
      name: 'createParkingDto',
      description: 'The parking to create',
      type: CreateParkingDto,
    }),
    ApiCreatedResponse({
      description: 'The parking has been successfully created.',
      type: Parking,
    }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
  );
}

export function ListParkings() {
  return applyDecorators(
    Get(),
    ApiResponse({
      status: 200,
      description: 'The list of parkings',
      isArray: true,
      type: Parking,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden.',
    }),
  );
}

export function FindParking(): MethodDecorator {
  return applyDecorators(
    Get(parameterId),
    ApiParam({
      name: 'id',
      description: 'The parking id',
      type: Number,
    }),
    ApiResponse({
      status: 200,
      description: 'The parking',
      type: Parking,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden.',
    }),
  );
}

export function UpdateParking(): MethodDecorator {
  return applyDecorators(
    Patch(parameterId),
    ApiParam({
      name: 'id',
      description: 'The parking id',
      type: Number,
    }),
    ApiOkResponse({
      description: 'The parking has been successfully updated.',
      type: Parking,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden.',
    }),
  );
}

export function DeleteParking(): MethodDecorator {
  return applyDecorators(
    Delete(parameterId),
    HttpCode(204),
    ApiNoContentResponse({
      description: 'The parking has been successfully deleted.',
    }),
    ApiForbiddenResponse({
      description: 'Forbidden.',
    }),
  );
}

export function ParkVehicleById(): MethodDecorator {
  return applyDecorators(
    Post(`${parameterId}/parkById`),
    ApiParam({
      name: 'id',
      description: 'The parking id',
      type: Number,
    }),
    ApiOkResponse({
      description: 'The vehicle has been successfully parked.',
      type: Ticket,
    }),
  );
}

export function ParkAndCreateVehicle(): MethodDecorator {
  return applyDecorators(
    Post(`${parameterId}/park`),
    ApiParam({
      name: 'id',
      description: 'The parking id',
      type: Number,
    }),
    ApiBody({
      description: 'The vehicle to create',
      type: CreateVehicleDto,
    }),
    ApiOkResponse({
      description: 'The vehicle has been successfully parked.',
      type: Ticket,
    }),
  );
}

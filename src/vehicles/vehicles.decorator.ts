import { Delete, Get, HttpCode, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { applyDecorators } from '@nestjs/common';
const parameterId = ':id';

export function CreateVehicle() {
  return applyDecorators(
    Post(),
    HttpCode(201),
    ApiParam({
      name: 'createVehicleDto',
      description: 'The vehicle to create',
      type: CreateVehicleDto,
    }),
    ApiCreatedResponse({
      description: 'The vehicle has been successfully created.',
      type: Vehicle,
    }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
  );
}

export function ListVehicles() {
  return applyDecorators(
    Get(),
    ApiResponse({
      status: 200,
      description: 'The list of vehicles',
      isArray: true,
      type: Vehicle,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden.',
    }),
  );
}

export function FindVehicle(): MethodDecorator {
  return applyDecorators(
    Get(parameterId),
    ApiParam({
      name: 'id',
      description: 'The vehicle id',
      type: Number,
    }),
    ApiResponse({
      status: 200,
      description: 'The vehicle',
      type: Vehicle,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden.',
    }),
  );
}

export function UpdateVehicle(): MethodDecorator {
  return applyDecorators(
    Patch(parameterId),
    ApiParam({
      name: 'id',
      description: 'The vehicle id',
      type: Number,
    }),
    ApiOkResponse({
      description: 'The vehicle has been successfully updated.',
      type: Vehicle,
    }),
    ApiForbiddenResponse({
      description: 'Forbidden.',
    }),
  );
}

export function DeleteVehicle(): MethodDecorator {
  return applyDecorators(
    Delete(parameterId),
    HttpCode(204),
    ApiNoContentResponse({
      description: 'The vehicle has been successfully deleted.',
    }),
    ApiForbiddenResponse({
      description: 'Forbidden.',
    }),
  );
}

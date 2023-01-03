import { Delete, Get, HttpCode, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { applyDecorators } from '@nestjs/common';

const parameterId = ':id';

export function CreateUser(): MethodDecorator {
  return applyDecorators(
    Post(),
    HttpCode(201),
    ApiParam({
      name: 'createUserDto',
      description: 'The user to create',
      type: CreateUserDto,
    }),
    ApiCreatedResponse({
      description: 'The user has been successfully created.',
      type: User,
    }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
  );
}

export function ListUsers(): MethodDecorator {
  return applyDecorators(
    Get(),
    ApiResponse({
      status: 200,
      description: 'The list of users',
      isArray: true,
      type: User,
    }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
  );
}

export function FindUser(): MethodDecorator {
  return applyDecorators(
    Get(parameterId),
    ApiParam({
      name: 'id',
      description: 'The user id',
      type: Number,
    }),
    ApiResponse({
      status: 200,
      description: 'The user',
      type: User,
    }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
  );
}

export function UpdateUser(): MethodDecorator {
  return applyDecorators(
    Patch(parameterId),
    ApiParam({
      name: 'id',
      description: 'The user id',
      type: Number,
    }),
    ApiOkResponse({
      description: 'The user has been successfully updated.',
      type: User,
    }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
  );
}

export function DeleteUser(): MethodDecorator {
  return applyDecorators(
    Delete(parameterId),
    HttpCode(204),
    ApiNoContentResponse({
      description: 'The user has been successfully deleted.',
    }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
  );
}

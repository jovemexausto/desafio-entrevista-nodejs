import { Get } from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function HourlySummary() {
  return applyDecorators(
    Get('/parkings/:parkingId/hourly'),
    ApiResponse({
      status: 200,
      description: 'The hourly summary of a parking',
      schema: {
        type: 'object',
        properties: {
          '2020-01-01 01:00': {
            type: 'object',
            properties: {
              ticketsCount: {
                type: 'number',
                example: 0,
              },
              ticketsCarCount: {
                type: 'number',
                example: 0,
              },
              ticketsMotorcycleCount: {
                type: 'number',
                example: 0,
              },
              ticketsEnteredCount: {
                type: 'number',
                example: 0,
              },
              ticketsExitedCount: {
                type: 'number',
                example: 0,
              },
            },
          },
        },
      },
    }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
  );
}

export function Summary() {
  return applyDecorators(
    Get('/parkings/:parkingId'),
    ApiResponse({
      status: 200,
      description: 'The summary of a parking',
      schema: {
        type: 'object',
        properties: {
          ticketsCount: {
            type: 'number',
            example: 0,
          },
          ticketsCarCount: {
            type: 'number',
            example: 0,
          },
          ticketsMotorcycleCount: {
            type: 'number',
            example: 0,
          },
          ticketsEnteredCount: {
            type: 'number',
            example: 0,
          },
          ticketsExitedCount: {
            type: 'number',
            example: 0,
          },
        },
      },
    }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
  );
}

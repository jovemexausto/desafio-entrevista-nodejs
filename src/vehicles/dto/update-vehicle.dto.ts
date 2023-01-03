import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';

export class UpdateVehicleDto extends OmitType(PartialType(CreateVehicleDto), [
  'plate',
] as const) {}

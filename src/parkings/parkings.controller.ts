import { Controller, Body, Param } from '@nestjs/common';
import { ParkingsService } from './parkings.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateParking,
  DeleteParking,
  FindParking,
  ListParkings,
  ParkAndCreateVehicle,
  ParkVehicleById,
  UpdateParking,
} from './parkings.decorator';
import { Roles } from 'src/auth/roles.guard';
import { CreateVehicleDto } from 'src/vehicles/dto/create-vehicle.dto';

@Roles('root')
@ApiTags('parkings')
@Controller('parkings')
export class ParkingsController {
  constructor(private readonly parkingsService: ParkingsService) {}

  @CreateParking()
  @ApiOperation({ summary: 'Creates a parking' })
  create(@Body() createParkingDto: CreateParkingDto) {
    return this.parkingsService.create(createParkingDto);
  }

  @ListParkings()
  @ApiOperation({ summary: 'Lists all parkings' })
  findAll() {
    return this.parkingsService.findAll();
  }

  @FindParking()
  @ApiOperation({ summary: 'Finds a parking by id' })
  findOne(@Param('id') id: string) {
    return this.parkingsService.findOne(+id);
  }

  @UpdateParking()
  @ApiOperation({ summary: 'Updates a parking by id' })
  update(@Param('id') id: string, @Body() updateParkingDto: UpdateParkingDto) {
    return this.parkingsService.update(+id, updateParkingDto);
  }

  @DeleteParking()
  @ApiOperation({ summary: 'Deletes a parking by id' })
  remove(@Param('id') id: string) {
    return this.parkingsService.remove(+id);
  }

  @ParkVehicleById()
  @ApiOperation({
    summary: 'Parks a vehicle by id',
  })
  parkById(@Param('id') id: string, @Body() vehicleDto: { vehicleId: number }) {
    return this.parkingsService.parkVehicleAt(+id, vehicleDto.vehicleId);
  }

  @ParkAndCreateVehicle()
  @ApiOperation({
    summary: 'Parks a new vehicle created from the given data',
  })
  park(@Param('id') id: string, @Body() vehicleDto: CreateVehicleDto) {
    return this.parkingsService.parkVehicleAt(+id, vehicleDto);
  }
}

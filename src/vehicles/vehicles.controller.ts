import { Controller, Body, Param, NotFoundException } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ForbiddenException } from '@nestjs/common';
import {
  CreateVehicle,
  DeleteVehicle,
  FindVehicle,
  ListVehicles,
  UpdateVehicle,
} from './vehicles.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @CreateVehicle()
  @ApiOperation({ summary: 'Creates a vehicle' })
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    try {
      return await this.vehiclesService.create(createVehicleDto);
    } catch (error) {
      throw new ForbiddenException('Vehiclename already exists');
    }
  }

  @ListVehicles()
  @ApiOperation({ summary: 'Lists all vehicles' })
  findAll() {
    return this.vehiclesService.findAll();
  }

  @FindVehicle()
  @ApiOperation({ summary: 'Finds a vehicle by id' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.vehiclesService.findOne(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @UpdateVehicle()
  @ApiOperation({ summary: 'Updates a vehicle by id' })
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    try {
      return await this.vehiclesService.update(+id, updateVehicleDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @DeleteVehicle()
  @ApiOperation({ summary: 'Deletes a vehicle by id' })
  async remove(@Param('id') id: string) {
    const deleteResult = await this.vehiclesService.remove(+id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException();
    }
  }
}

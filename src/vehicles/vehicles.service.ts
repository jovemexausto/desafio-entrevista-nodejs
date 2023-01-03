import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  findAll() {
    return Vehicle.find();
  }

  findOne(id: number) {
    return Vehicle.findOneOrFail({
      where: {
        id,
      },
    });
  }

  findByPlate(plate: string): Promise<Partial<Vehicle>> {
    return Vehicle.findOneOrFail({
      where: {
        plate,
      },
    });
  }

  async create(createVehicleDto: CreateVehicleDto) {
    const vehicle = new Vehicle();
    Object.assign(vehicle, createVehicleDto);
    return await vehicle.save();
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await Vehicle.findOneOrFail({
      where: {
        id,
      },
    });

    Object.assign(vehicle, updateVehicleDto);

    return vehicle.save();
  }

  remove(id: number) {
    return Vehicle.delete(id);
  }
}

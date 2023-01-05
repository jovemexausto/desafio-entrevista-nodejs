import { ForbiddenException, Injectable } from '@nestjs/common';
import { TicketsService } from 'src/tickets/tickets.service';
import { CreateVehicleDto } from 'src/vehicles/dto/create-vehicle.dto';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { Parking } from './entities/parking.entity';

@Injectable()
export class ParkingsService {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly ticketsService: TicketsService,
  ) {}

  findAll() {
    return Parking.find();
  }

  findOne(id: number): Promise<Partial<Parking>> {
    return Parking.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async create(createParkingDto: CreateParkingDto) {
    const parking = new Parking();
    Object.assign(parking, createParkingDto);
    return await parking.save();
  }

  async update(id: number, updateParkingDto: UpdateParkingDto) {
    const parking = await Parking.findOneOrFail({
      where: {
        id,
      },
    });

    Object.assign(parking, updateParkingDto);

    return parking.save();
  }

  remove(id: number) {
    return Parking.delete(id);
  }

  async getVehiclesParkedAt(parkingId: number) {
    const tickets = await this.ticketsService.findBy({
      parkingId,
      status: 'entered',
    });
    const vehiclesIds = tickets.map((ticket) => ticket.vehicleId);
    return await this.vehiclesService.findAllByIds(vehiclesIds);
  }

  async getAvailableSpacesAt(
    parkingId: number,
  ): Promise<{ carSpaces: number; motorcycleSpaces: number }> {
    const parking = await this.findOne(parkingId);
    const vehicles = await this.getVehiclesParkedAt(parkingId);
    return {
      carSpaces:
        parking.carSpaces -
        vehicles.filter((vehicle) => vehicle.type === 'car').length,
      motorcycleSpaces:
        parking.motorcycleSpaces -
        vehicles.filter((vehicle) => vehicle.type === 'motorcycle').length,
    };
  }

  async parkVehicleAt(
    parkingId: number,
    vehicleOrId: CreateVehicleDto | number,
  ) {
    if (!vehicleOrId) {
      throw new ForbiddenException(
        'You must provide a vehicleId or vehicleDto',
      );
    }

    const parking = await this.findOne(parkingId);

    const vehicle: Partial<Vehicle> =
      typeof vehicleOrId === 'number'
        ? await this.vehiclesService.findOne(vehicleOrId)
        : await this.vehiclesService.create(vehicleOrId);

    const parkedVehicles = await this.getVehiclesParkedAt(parkingId);
    const availableSpaces = await this.getAvailableSpacesAt(parkingId);

    if (parkedVehicles.some((v) => v.plate === vehicle.plate)) {
      throw new ForbiddenException('This vehicle is already parked');
    }

    if (
      (vehicle.type === 'car' && availableSpaces.carSpaces === 0) ||
      (vehicle.type === 'motorcycle' && availableSpaces.motorcycleSpaces === 0)
    ) {
      throw new ForbiddenException('There are no available spaces');
    }

    return this.ticketsService.create({
      vehicleId: vehicle.id,
      parkingId: parking.id,
      vehicleType: vehicle.type,
    });
  }
}

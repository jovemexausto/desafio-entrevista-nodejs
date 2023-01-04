import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  findAll(): Promise<Partial<Ticket>[]> {
    return Ticket.find();
  }

  findAllByParkingId(parkingId: number): Promise<Partial<Ticket>[]> {
    return Ticket.find({
      where: {
        parkingId,
      },
    });
  }

  findAllByVehicleId(vehicleId: number) {
    return Ticket.find({
      where: {
        vehicleId,
      },
    });
  }

  findOne(id: number) {
    return Ticket.findOneOrFail({
      where: {
        id,
      },
    });
  }

  findBy(params: FindOptionsWhere<Ticket>): Promise<Partial<Ticket>[]> {
    return Ticket.find({
      where: params,
    });
  }

  async create(createTicketDto: CreateTicketDto) {
    const ticket = new Ticket();
    Object.assign(ticket, createTicketDto);
    return await ticket.save();
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket = await Ticket.findOneOrFail({
      where: {
        id,
      },
    });

    Object.assign(ticket, updateTicketDto);

    return ticket.save();
  }

  remove(id: number) {
    return Ticket.delete(id);
  }
}

export default [
  {
    id: 1,
    status: 'entered',
    vehicleType: 'car',
    enteredAt: new Date('2022-01-01T00:00:00Z'),
    vehicleId: 1,
    parkingId: 1,
  },
  {
    id: 2,
    status: 'exited',
    vehicleType: 'motorcycle',
    enteredAt: new Date('2022-01-02T00:00:00Z'),
    exitedAt: new Date('2022-01-03T00:00:00Z'),
    vehicleId: 2,
    parkingId: 1,
  },
  {
    id: 3,
    status: 'entered',
    vehicleType: 'truck',
    enteredAt: new Date('2022-01-03T00:00:00Z'),
    vehicleId: 3,
    parkingId: 1,
  },
  {
    id: 4,
    status: 'exited',
    vehicleType: 'car',
    enteredAt: new Date('2022-01-04T00:00:00Z'),
    exitedAt: new Date('2022-01-05T00:00:00Z'),
    vehicleId: 4,
    parkingId: 1,
  },
  {
    id: 5,
    status: 'entered',
    vehicleType: 'motorcycle',
    enteredAt: new Date('2022-01-05T00:00:00Z'),
    vehicleId: 5,
    parkingId: 1,
  },
];

interface Ticket {
  id: number;
  status: string;
  vehicleType: string;
  enteredAt: Date;
  exitedAt?: Date;
  vehicleId: number;
  parkingId: number;
}

export interface GenerateTicketsConfig {
  numTickets?: number;
  startDate?: Date;
  ticketInterval?: number;
  ticketStatus?: string;
  vehicleType?: string;
  vehicleIdStart?: number;
  parkingIdStart?: number;
  interpolateVehicleType?: boolean;
}

export function generateTickets(config: GenerateTicketsConfig = {}): Ticket[] {
  const numTickets = config.numTickets || 100;
  const startDate = config.startDate || new Date('2022-01-01T00:00:00Z');
  const ticketInterval = config.ticketInterval || 86400000;
  const ticketStatus = config.ticketStatus || 'entered';
  const vehicleType = config.vehicleType || 'car';
  const vehicleIdStart = config.vehicleIdStart || 1;
  const parkingIdStart = config.parkingIdStart || 1;
  const interpolateVehicleType = config.interpolateVehicleType || false;
  const vehicleTypes = ['car', 'motorcycle'];

  const tickets: Ticket[] = [];

  for (let i = 1; i <= numTickets; i++) {
    tickets.push({
      id: i,
      status: ticketStatus,
      vehicleType: interpolateVehicleType
        ? vehicleTypes[(i - 1) % vehicleTypes.length]
        : vehicleType,
      enteredAt: new Date(startDate.getTime() + (i - 1) * ticketInterval),
      exitedAt:
        ticketStatus === 'exited'
          ? new Date(startDate.getTime() + i * ticketInterval)
          : undefined,
      vehicleId: vehicleIdStart + i - 1,
      parkingId: parkingIdStart + i - 1,
    });
  }

  return tickets;
}

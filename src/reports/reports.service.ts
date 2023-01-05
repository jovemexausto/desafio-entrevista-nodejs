import { Injectable } from '@nestjs/common';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { TicketsService } from 'src/tickets/tickets.service';

@Injectable()
export class ReportsService {
  constructor(private readonly ticketsService: TicketsService) {}

  async summary(parkingId: number) {
    const tickets = await this.ticketsService.findAllByParkingId(parkingId);
    return this.createReport(tickets as Ticket[]);
  }

  async hourlySummary(parkingId: number) {
    const tickets = await this.ticketsService.findAllByParkingId(parkingId);
    const groupedTickets = this.groupTicketsByHour(tickets as Ticket[]);
    const hourlySummary = {};
    Object.keys(groupedTickets).forEach((hour) => {
      hourlySummary[hour] = this.createReport(groupedTickets[hour]);
    });

    return hourlySummary;
  }

  private createReport(tickets: Ticket[]) {
    const report = {
      ticketsCount: tickets.length,
      ticketsCarCount: 0,
      ticketsMotorcycleCount: 0,
      ticketsEnteredCount: 0,
      ticketsExitedCount: 0,
    };

    if (!tickets.length) {
      return report;
    }

    tickets.forEach((ticket) => {
      ticket.vehicleType === 'car'
        ? report.ticketsCarCount++
        : report.ticketsMotorcycleCount++;

      ticket.status === 'entered'
        ? report.ticketsEnteredCount++
        : report.ticketsExitedCount++;
    });

    return report;
  }

  private groupTicketsByHour(tickets: Ticket[]): { [hour: string]: Ticket[] } {
    const currentMonth = new Date().getMonth();
    const groupedTickets: { [hour: string]: Ticket[] } = {};
    // eslint-disable-next-line prettier/prettier
    const formatHour = (date: Date) => `${date.toISOString().slice(0, 10)} ${date.toISOString().slice(11, 13) + 'h'}`;
    tickets.forEach((ticket) => {
      const ticketMonth = ticket.enteredAt.getMonth();
      if (ticketMonth === currentMonth) {
        const hourString = formatHour(ticket.enteredAt);
        if (groupedTickets[hourString]) {
          groupedTickets[hourString].push(ticket);
        } else {
          groupedTickets[hourString] = [ticket];
        }
      }
    });
    return groupedTickets;
  }
}

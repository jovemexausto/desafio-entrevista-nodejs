import { Parking } from '../../src/parkings/entities/parking.entity';
import { DataSource, In } from 'typeorm';

export class ParkingsSeed {
  private DataSouce: DataSource;

  constructor(DataSouce: DataSource) {
    this.DataSouce = DataSouce;
  }

  private parkings: Partial<Parking>[] = [
    {
      id: 1,
      name: 'Parking 1',
      cnpj: '12345678901234',
      address: '123 Main St',
      phone: '123-456-7890',
      carSpaces: 10,
      motorcycleSpaces: 5,
    },
    {
      id: 2,
      name: 'Parking 2',
      cnpj: '23456789012345',
      address: '456 Main St',
      phone: '234-567-8901',
      carSpaces: 15,
      motorcycleSpaces: 10,
    },
  ];

  public async seed(): Promise<void> {
    const existingParkings = await Parking.findBy({
      id: In(this.parkings.map((parking) => parking.id)),
    });

    if (existingParkings.length > 0) {
      console.log('Parkings already seeded');
      return;
    }

    await Promise.all(
      this.parkings.map(async (parking) => {
        const p = new Parking();
        Object.assign(p, parking);
        await p.save();
      }),
    );

    console.log('Parkings seeded');
  }
}

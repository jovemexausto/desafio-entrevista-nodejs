import { VehicleTypes } from 'src/vehicles/entities/vehicle.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'entered' })
  status: 'entered' | 'exited';

  @Column()
  type: VehicleTypes;

  @CreateDateColumn()
  enteredAt: Date;

  @Column({ nullable: true })
  exitedAt?: Date;

  @Column()
  vehicleId: number;

  @Column()
  parkingId: number;
}

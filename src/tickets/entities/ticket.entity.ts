import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'entered' })
  status: 'entered' | 'exited';

  @Column()
  type: 'car' | 'motorcycle';

  @CreateDateColumn()
  enteredAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  exitedAt?: Date;

  @Column()
  vehicleId: number;

  @Column()
  parkingId: number;
}

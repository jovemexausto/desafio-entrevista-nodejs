import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export type VehicleTypes = typeof Vehicle.types[number];

@Entity()
export class Vehicle extends BaseEntity {
  static readonly types = ['car', 'motorcycle'] as const;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column({ unique: true })
  plate: string;

  @Column()
  color: string;

  @Column()
  year: number;

  @Column()
  type: VehicleTypes;
}

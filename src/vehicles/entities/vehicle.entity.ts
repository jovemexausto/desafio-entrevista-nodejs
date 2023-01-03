import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Vehicle extends BaseEntity {
  static readonly types = ['car', 'motorcycle'];

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
  type: string;
}

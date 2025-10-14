import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('senior_health')
export class SeniorHealth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  heartRate: number;

  @Column('json')
  bloodPressure: { systolic: number; diastolic: number };

  @Column({ nullable: true })
  glucoseLevel?: number;

  @Column()
  fallDetected: boolean;

  @Column()
  medicationTaken: boolean;
}

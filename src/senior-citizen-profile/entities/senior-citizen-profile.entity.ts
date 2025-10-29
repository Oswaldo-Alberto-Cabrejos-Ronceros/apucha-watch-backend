import { Device } from 'src/device/entities/device.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'senior_citizen_profiles' })
export class SeniorCitizenProfile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column()
  birthdate: Date;
  @Column({ nullable: true })
  phone: string;
  @OneToOne(() => Device)
  @JoinColumn({ name: 'device_id' })
  device: Device;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt?: Date;
  @DeleteDateColumn()
  deleteAt?: Date;
}

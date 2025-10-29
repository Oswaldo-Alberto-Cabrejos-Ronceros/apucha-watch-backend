import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Device } from '../../device/entities/device.entity';

@Entity({ name: 'vital_signs' })
export class VitalSign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'device_code' })
  deviceCode: string;

  @Column({ type: 'timestamp', name: 'time_stamp' })
  timeStamp: Date;

  @Column('int', { name: 'heart_rate' })
  heartRate: number;

  @Column('int', { name: 'oxygen_saturation' })
  oxygenSaturation: number;

  @ManyToOne(() => Device, (device) => device.vitalSigns)
  @JoinColumn({ name: 'deviceCode', referencedColumnName: 'code' })
  device: Device;
}

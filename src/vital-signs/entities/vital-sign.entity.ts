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

  @Column()
  deviceCode: string;

  @Column({ type: 'timestamp' })
  timeStamp: Date;

  @Column('int')
  heartRate: number;

  @Column('int')
  oxygenSaturation: number;

  @ManyToOne(() => Device, (device) => device.vitalSigns)
  @JoinColumn({ name: 'deviceCode', referencedColumnName: 'code' })
  device: Device;
}

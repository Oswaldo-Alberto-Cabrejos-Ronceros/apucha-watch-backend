import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Device } from '../../device/entities/device.entity';

@Entity({ name: 'ubications' })
export class Ubication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  deviceCode: string;

  @Column({ type: 'timestamp' })
  timeStamp: Date;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'float' })
  altitude: number;

  @Column({ type: 'float' })
  speed: number;

  @Column({ type: 'int' })
  satelites: number;

  @Column({ type: 'float' })
  hdop: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt?: Date;

  @DeleteDateColumn()
  deleteAt?: Date;

  @ManyToOne(() => Device, (device) => device.ubications)
  @JoinColumn({ name: 'deviceCode', referencedColumnName: 'code' })
  device: Device;
}

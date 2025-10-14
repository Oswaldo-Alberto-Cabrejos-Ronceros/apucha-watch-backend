import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CaredSeniorCitizen } from 'src/cared-senior-citizen/entities/cared-senior-citizen.entity';
import { Device } from 'src/device/entities/device.entity';

@Entity()
export class FallEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  timestamp: Date;
  /*
  @Column({ type: 'float', nullable: true })
  lat: number;

  @Column({ type: 'float', nullable: true })
  lon: number;*/

  @ManyToOne(() => CaredSeniorCitizen, (senior) => senior.id)
  seniorCitizen: CaredSeniorCitizen;

  @ManyToOne(() => Device, (device) => device.id)
  device: Device;
}

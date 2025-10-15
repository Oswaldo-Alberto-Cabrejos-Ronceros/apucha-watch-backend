import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Device } from 'src/device/entities/device.entity';
import { SeniorCitizenProfile } from 'src/senior-citizen-profile/entities/senior-citizen-profile.entity';

@Entity()
export class FallEvent {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  timestamp: Date;
  /*
  @Column({ type: 'float', nullable: true })
  lat: number;

  @Column({ type: 'float', nullable: true })
  lon: number;*/

  @ManyToOne(() => SeniorCitizenProfile, (senior) => senior.id)
  seniorCitizen: SeniorCitizenProfile;

  @ManyToOne(() => Device, (device) => device.id)
  device: Device;
}

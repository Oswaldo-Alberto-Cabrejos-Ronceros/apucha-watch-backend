import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { ResolutionVitalSigns } from '../enums/resolution.enum';

@Entity({ name: 'vital_signs_summary' })
export class VitalSignsSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'device_code' })
  deviceCode: string;

  @Column({ type: 'timestamp', name: 'start_time' })
  startTime: Date;

  @Column({ name: 'heart_rate' })
  HeartRate: number;

  @Column({ name: 'oxygen_saturation' })
  oxygenSaturation: number;

  @Column({ type: 'enum', enum: ResolutionVitalSigns, name: 'resolution' })
  resolution: ResolutionVitalSigns;
}

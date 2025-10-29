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

  @Column({ name: 'avg_heart_rate' })
  avgHeartRate: number;

  @Column({ name: 'avg_oxygen_saturation' })
  avgOxygenSaturation: number;

  @Column({ type: 'enum', enum: ResolutionVitalSigns, name: 'resolution' })
  resolution: ResolutionVitalSigns;
}

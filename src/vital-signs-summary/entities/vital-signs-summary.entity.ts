import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { ResolutionVitalSigns } from '../enums/resolution.enum';

@Entity({ name: 'vital_signs_summary' })
export class VitalSignsSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceCode: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column()
  avgHeartRate: number;

  @Column()
  avgOxygenSaturation: number;

  @Column({ type: 'enum', enum: ResolutionVitalSigns })
  resolution: ResolutionVitalSigns;
}

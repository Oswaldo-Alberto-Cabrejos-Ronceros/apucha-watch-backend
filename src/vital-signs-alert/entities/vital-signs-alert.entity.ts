import { SeniorCitizenProfile } from 'src/senior-citizen-profile/entities/senior-citizen-profile.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VitalSignAlertSeverity } from '../enums/vital-sign-alert-severity';
import { VitalSignAlertType } from '../enums/vital-sign-alert-type';
import { VitalSign } from 'src/vital-signs/entities/vital-sign.entity';

@Entity()
export class VitalSignsAlert {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(
    () => SeniorCitizenProfile,
    (seniorCitizenProfile) => seniorCitizenProfile.id,
  )
  @JoinColumn({ name: 'senior_citizen_profile_id' })
  seniorCitizenProfile: SeniorCitizenProfile;

  @JoinColumn({ name: 'vital_sign_id' })
  vitalSign: VitalSign;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: 'enum', enum: VitalSignAlertType })
  type: VitalSignAlertType;

  @Column({
    type: 'enum',
    enum: VitalSignAlertSeverity,
    default: VitalSignAlertSeverity.LEVE,
  })
  severity: VitalSignAlertSeverity;

  @DeleteDateColumn()
  deleteAt?: Date;
}

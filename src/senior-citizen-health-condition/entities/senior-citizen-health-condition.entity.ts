import { HealthCondition } from 'src/health-condition/entities/health-condition.entity';
import { SeniorCitizenProfile } from 'src/senior-citizen-profile/entities/senior-citizen-profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConditionSeverity } from '../enums/contition-severity.enum';

@Entity({ name: 'senior_citizen_health_conditions' })
export class SeniorCitizenHealthCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SeniorCitizenProfile)
  @JoinColumn({ name: 'senior_citizen_profile_id' })
  seniorCitizenProfile: SeniorCitizenProfile;

  @ManyToOne(() => HealthCondition)
  @JoinColumn({ name: 'health_condition_id' })
  healthCondition: HealthCondition;

  @Column()
  diagnosisDate: Date;

  @Column({
    type: 'enum',
    enum: ConditionSeverity,
    default: ConditionSeverity.LEVE,
  })
  severity: ConditionSeverity;

  @CreateDateColumn()
  createAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;
}

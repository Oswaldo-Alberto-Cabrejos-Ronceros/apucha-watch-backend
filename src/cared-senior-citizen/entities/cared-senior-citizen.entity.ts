import { CaredProfile } from 'src/cared-profile/entities/cared-profile.entity';
import { SeniorCitizenProfile } from 'src/senior-citizen-profile/entities/senior-citizen-profile.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'cared_senior_citizens' })
@Unique(['caredProfile', 'seniorCitizenProfile'])
export class CaredSeniorCitizen {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => CaredProfile)
  @JoinColumn({ name: 'cared_profile_id' })
  caredProfile: CaredProfile;
  @JoinColumn({ name: 'senior_citizen_profile_id' })
  @ManyToOne(() => SeniorCitizenProfile)
  seniorCitizenProfile: SeniorCitizenProfile;
  @CreateDateColumn()
  createAt: Date;
}

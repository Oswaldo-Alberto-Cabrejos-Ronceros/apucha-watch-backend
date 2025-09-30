import { CarerProfle } from 'src/carer-profle/entities/carer-profle.entity';
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
@Unique(['carerProfile', 'seniorCitizenProfile'])
export class CaredSeniorCitizen {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => CarerProfle)
  @JoinColumn({ name: 'carer_profile_id' })
  carerProfile: CarerProfle;
  @JoinColumn({ name: 'senior_citizen_profile_id' })
  @ManyToOne(() => SeniorCitizenProfile)
  seniorCitizenProfile: SeniorCitizenProfile;
  @CreateDateColumn()
  createAt: Date;
}

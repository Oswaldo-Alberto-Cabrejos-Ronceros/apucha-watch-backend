import { CarerProfle } from 'src/carer-profle/entities/carer-profle.entity';
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
  @ManyToOne(() => CarerProfle)
  seniorCitizenProfile: CarerProfle;
  @CreateDateColumn()
  createAt: Date;
}

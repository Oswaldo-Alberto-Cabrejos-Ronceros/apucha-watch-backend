import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'senior_citizen_profiles' })
export class SeniorCitizenProfile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column()
  birthdate: Date;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt?: Date;
  @DeleteDateColumn()
  deleteAt?: Date;
}

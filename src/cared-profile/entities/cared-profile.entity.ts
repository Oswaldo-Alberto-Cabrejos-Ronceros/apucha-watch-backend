import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserType } from '../enum/user-type.enum';

@Entity({ name: 'cared_profiles' })
export class CaredProfile {
  @PrimaryGeneratedColumn()
  id: number;
  //for user id from supabase auth
  @Column({ type: 'uuid', unique: true })
  userId: string;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column({ type: 'enum', enum: UserType, default: UserType.GENERAL })
  userType: UserType;
  @Column({ nullable: true })
  deviceToken: string;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt?: Date;
  @DeleteDateColumn()
  deleteAt?: Date;
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserType } from '../enum/user-type.enum';

@Entity({ name: 'carer_profiles' })
export class CarerProfle {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column({ type: 'enum', enum: UserType, default: UserType.GENERAL })
  userType: UserType;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt?: Date;
  @DeleteDateColumn()
  deleteAt?: Date;
}

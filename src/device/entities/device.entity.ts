import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ubication } from '../../ubication/entities/ubication.entity';
import { VitalSign } from '../../vital-signs/entities/vital-sign.entity';

@Entity({ name: 'devices' })
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt?: Date;

  @DeleteDateColumn()
  deleteAt?: Date;

  @OneToMany(() => Ubication, (ubication) => ubication.device)
  ubications: Ubication[];

  @OneToMany(() => VitalSign, (vitalSigns) => vitalSigns.device)
  vitalSigns: VitalSign[];
}

import { Column, 
  CreateDateColumn, 
  DeleteDateColumn, 
  Entity,
  OneToMany, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn, 
} from 'typeorm';
import { Ubication } from '../../ubication/entities/ubication.entity';

@Entity({ name: 'devices' })
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  code: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt?: Date;

  @DeleteDateColumn()
  deleteAt?: Date;

  @OneToMany(() => Ubication, (ubication) => ubication.device)
  ubications: Ubication[];
}

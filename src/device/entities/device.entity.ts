import { Column, 
  CreateDateColumn, 
  DeleteDateColumn, 
  Entity, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn, 
} from 'typeorm';

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
}

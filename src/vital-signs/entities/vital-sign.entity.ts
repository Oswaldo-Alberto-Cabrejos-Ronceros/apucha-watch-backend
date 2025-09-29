import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Device } from '../../device/entities/device.entity';

@Entity()
export class VitalSign {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    deviceCode: string;

    @Column({ type: 'timestamp' })
    timestamp: Date;

    @Column('int')
    heartRate: number;

    @Column('int')
    oxigenSaturation: number;

    @ManyToOne(() => Device, (device) => device.vitalSigns)
    @JoinColumn({ name: 'deviceCode', referencedColumnName: 'code' })
    device: Device;
}


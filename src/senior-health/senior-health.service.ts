import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeniorHealth } from './entities/senior-health.entity';
import { CreateSeniorHealthDto } from './dto/create-senior-health.dto';

@Injectable()
export class SeniorHealthService {
  constructor(
    @InjectRepository(SeniorHealth)
    private readonly repo: Repository<SeniorHealth>,
  ) {}

  async create(data: CreateSeniorHealthDto): Promise<SeniorHealth> {
    const record = this.repo.create(data);
    return this.repo.save(record);
  }

  async findAll(): Promise<SeniorHealth[]> {
    return this.repo.find();
  }

  async checkAlerts(id: number): Promise<string[]> {
    const record = await this.repo.findOneBy({ id });
    const alerts: string[] = [];

    if (!record) return ['Registro no encontrado'];

    if (record.heartRate < 50 || record.heartRate > 120) {
      alerts.push('Ritmo cardíaco fuera de rango');
    }

    if (record.bloodPressure.systolic > 140 || record.bloodPressure.diastolic > 90) {
      alerts.push('Presión arterial elevada');
    }

    if (record.fallDetected) {
      alerts.push('Posible caída detectada');
    }

    if (!record.medicationTaken) {
      alerts.push('Medicación no registrada');
    }

    return alerts;
  }
}

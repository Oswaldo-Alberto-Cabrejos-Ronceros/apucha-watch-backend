import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VitalSignsSummary } from './entities/vital-signs-summary.entity';
import { Repository } from 'typeorm';
import { ResolutionVitalSigns } from './enums/resolution.enum';

@Injectable()
export class VitalSignsSummaryService {
  constructor(
    @InjectRepository(VitalSignsSummary)
    private readonly vitalSignsRepo: Repository<VitalSignsSummary>,
  ) {}

  async findAll() {
    return await this.vitalSignsRepo.find();
  }

  async findAllByIdAndResolution(
    deviceCode: string,
    resolution: ResolutionVitalSigns,
  ) {
    return await this.vitalSignsRepo.find({
      where: {
        deviceCode: deviceCode,
        resolution: resolution,
      },
    });
  }

  remove(id: number) {
    return this.vitalSignsRepo.delete(id);
  }
}

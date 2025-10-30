import { Injectable } from '@nestjs/common';
import { CreateVitalSignsAlertDto } from './dto/create-vital-signs-alert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VitalSignsAlert } from './entities/vital-signs-alert.entity';
import { VitalSignAlertType } from './enums/vital-sign-alert-type';

@Injectable()
export class VitalSignsAlertService {
  constructor(
    @InjectRepository(VitalSignsAlert)
    private readonly repo: Repository<VitalSignsAlert>,
  ) {}
  async create(createVitalSignsAlertDto: CreateVitalSignsAlertDto) {
    const entity = this.repo.create({
      ...createVitalSignsAlertDto,
      seniorCitizenProfile: {
        id: createVitalSignsAlertDto.seniorCitizenProfileId,
      },
      vitalSign: {
        id: createVitalSignsAlertDto.vitalSignId,
      },
    });
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findAllBySeniorId(seniorProfileId: number) {
    return await this.repo.findBy({
      seniorCitizenProfile: {
        id: seniorProfileId,
      },
    });
  }

  async findAllBySeniorIdAndType(
    seniorProfileId: number,
    type: VitalSignAlertType,
  ) {
    return await this.repo.findBy({
      seniorCitizenProfile: {
        id: seniorProfileId,
      },
      type: type,
    });
  }

  async findOne(id: number) {
    return await this.repo.findOneByOrFail({
      id: id,
    });
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }
}

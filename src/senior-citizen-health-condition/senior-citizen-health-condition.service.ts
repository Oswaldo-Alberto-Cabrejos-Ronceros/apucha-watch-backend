import { Injectable } from '@nestjs/common';
import { CreateSeniorCitizenHealthConditionDto } from './dto/create-senior-citizen-health-condition.dto';
import { UpdateSeniorCitizenHealthConditionDto } from './dto/update-senior-citizen-health-condition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeniorCitizenHealthCondition } from './entities/senior-citizen-health-condition.entity';

@Injectable()
export class SeniorCitizenHealthConditionService {
  constructor(
    @InjectRepository(SeniorCitizenHealthCondition)
    private readonly seniorCitizenHealthConditionRepository: Repository<SeniorCitizenHealthCondition>,
  ) {}
  async create(
    createSeniorCitizenHealthConditionDto: CreateSeniorCitizenHealthConditionDto,
  ) {
    const entity = this.seniorCitizenHealthConditionRepository.create({
      ...createSeniorCitizenHealthConditionDto,
      seniorCitizenProfile: {
        id: createSeniorCitizenHealthConditionDto.seniorCitizenProfileId,
      },
      healthCondition: {
        id: createSeniorCitizenHealthConditionDto.healthConditionId,
      },
    });
    return await this.seniorCitizenHealthConditionRepository.save(entity);
  }

  async findAll() {
    return await this.seniorCitizenHealthConditionRepository.find();
  }

  async findAllBySeniorCitizenId(seniorCitizenId: number) {
    return await this.seniorCitizenHealthConditionRepository.find({
      where: {
        seniorCitizenProfile: {
          id: seniorCitizenId,
        },
      },
      relations: {
        healthCondition: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.seniorCitizenHealthConditionRepository.findOneByOrFail({
      id: id,
    });
  }

  async update(
    id: number,
    updateSeniorCitizenHealthConditionDto: UpdateSeniorCitizenHealthConditionDto,
  ) {
    const entity = await this.findOne(id);
    if (
      updateSeniorCitizenHealthConditionDto.severity &&
      updateSeniorCitizenHealthConditionDto.severity !== entity.severity
    ) {
      entity.severity = updateSeniorCitizenHealthConditionDto.severity;
    }
    if (
      updateSeniorCitizenHealthConditionDto.diagnosisDate &&
      updateSeniorCitizenHealthConditionDto.diagnosisDate !==
        entity.diagnosisDate
    ) {
      entity.diagnosisDate =
        updateSeniorCitizenHealthConditionDto.diagnosisDate;
    }
    return await this.seniorCitizenHealthConditionRepository.save(entity);
  }

  async remove(id: number) {
    return this.seniorCitizenHealthConditionRepository.delete(id);
  }
}

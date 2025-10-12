import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthConditionRecommendation } from './entities/health-condition-recommendation.entity';
import { CreateHealthConditionRecommendationDto } from './dto/create-health-condition-recommendation.dto';
import { UpdateHealthConditionRecommendationDto } from './dto/update-health-condition-recommendation.dto';

@Injectable()
export class HealthConditionRecommendationService {
  constructor(
    @InjectRepository(HealthConditionRecommendation)
    private readonly repo: Repository<HealthConditionRecommendation>,
  ) {}

  async create(createDto: CreateHealthConditionRecommendationDto) {
    const entity = this.repo.create({
      healthCondition: { id: createDto.healthConditionId },
      healthRecommendation: { id: createDto.healthRecommendationId },
    });
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find({
      relations: ['healthCondition', 'healthRecommendation'],
    });
  }

  async findOne(id: number) {
    return await this.repo.findOneOrFail({
      where: { id },
      relations: ['healthCondition', 'healthRecommendation'],
    });
  }

  async update(id: number, updateDto: UpdateHealthConditionRecommendationDto) {
    const entity = await this.findOne(id);

    if (updateDto.healthConditionId) {
      entity.healthCondition.id = updateDto.healthConditionId;
    }
    if (updateDto.healthRecommendationId) {
      entity.healthRecommendation.id = updateDto.healthRecommendationId;
    }

    return await this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    return await this.repo.softDelete(entity.id);
  }

  async restore(id: number) {
    const entity = await this.repo.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!entity?.deletedAt) {
      throw new ConflictException('El registro no está eliminado');
    }
    return await this.repo.restore(entity.id);
  }
}

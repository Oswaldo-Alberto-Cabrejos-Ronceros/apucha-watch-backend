import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthRecommendation } from './entities/health-recommendation.entity';
import { CreateHealthRecommendationDto } from './dto/create-health-recommendation.dto';
import { UpdateHealthRecommendationDto } from './dto/update-health-recommendation.dto';

@Injectable()
export class HealthRecommendationService {
  constructor(
    @InjectRepository(HealthRecommendation)
    private readonly repo: Repository<HealthRecommendation>,
  ) {}

  async create(createDto: CreateHealthRecommendationDto) {
    const entity = this.repo.create(createDto);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOneByOrFail({ id });
  }

  async update(id: number, updateDto: UpdateHealthRecommendationDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
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

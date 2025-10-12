import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthCondition } from './entities/health-condition.entity';
import { CreateHealthConditionDto } from './dto/create-health-condition.dto';
import { UpdateHealthConditionDto } from './dto/update-health-condition.dto';

@Injectable()
export class HealthConditionService {
  constructor(
    @InjectRepository(HealthCondition)
    private readonly repo: Repository<HealthCondition>,
  ) {}

  async create(dto: CreateHealthConditionDto) {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async findAll() {
    return await this.repo.find({
      relations: ['healthConditionRecommendations'],
    });
  }

  async findOne(id: number) {
    return await this.repo.findOneByOrFail({ id });
  }

  async update(id: number, dto: UpdateHealthConditionDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return await this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    return await this.repo.softDelete(entity);
  }

  async restore(id: number) {
    const entity = await this.repo.findOneOrFail({
      where: { id },
      withDeleted: true,
    });
    if (!entity.deletedAt) {
      throw new ConflictException('La condición de salud no está eliminada');
    }
    return await this.repo.restore(entity);
  }
}

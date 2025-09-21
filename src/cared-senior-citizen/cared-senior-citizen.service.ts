import { Injectable } from '@nestjs/common';
import { CreateCaredSeniorCitizenDto } from './dto/create-cared-senior-citizen.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CaredSeniorCitizen } from './entities/cared-senior-citizen.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CaredSeniorCitizenService {
  constructor(
    @InjectRepository(CaredSeniorCitizen)
    private readonly caredSeniorCitizenRepository: Repository<CaredSeniorCitizen>,
  ) {}
  async create(createCaredSeniorCitizenDto: CreateCaredSeniorCitizenDto) {
    const entity = this.caredSeniorCitizenRepository.create({
      carerProfile: { id: createCaredSeniorCitizenDto.carerProfileId },
      seniorCitizenProfile: {
        id: createCaredSeniorCitizenDto.seniorCitizenProfileId,
      },
    });
    return await this.caredSeniorCitizenRepository.save(entity);
  }

  async findAll() {
    return this.caredSeniorCitizenRepository.find();
  }

  async findOne(id: number) {
    return this.caredSeniorCitizenRepository.findOneByOrFail({ id: id });
  }

  async remove(id: number) {
    const caredSeniorCitizen = await this.findOne(id);
    return await this.caredSeniorCitizenRepository.delete(caredSeniorCitizen);
  }
}

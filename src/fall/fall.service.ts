import { Injectable } from '@nestjs/common';
import { CreateFallDto } from './dto/create-fall.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FallEvent } from './entities/fall.entity';

@Injectable()
export class FallService {
  constructor(
    @InjectRepository(FallEvent)
    private readonly fallRespository: Repository<FallEvent>,
  ) {}

  async registerFallEvent(dto: CreateFallDto) {
    const withDate = {
      deviceCode: dto.deviceCode,
      timestamp: new Date(),
    };
    const entity = this.fallRespository.create(withDate);
    return await this.fallRespository.save(entity);
  }

  async getFallHistory(seniorCitizenId: number) {
    return await this.fallRespository.find({
      where: {
        seniorCitizen: {
          id: seniorCitizenId,
        },
      },
    });
  }
}

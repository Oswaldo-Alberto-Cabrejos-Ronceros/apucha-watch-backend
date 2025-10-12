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

  registerFallEvent(event: CreateFallDto) {
    const entity = this.fallRespository.create(event);
    return this.fallRespository.save(entity);
  }

  getFallHistory(seniorCitizenId: number) {
    return this.fallRespository.find({
      where: {
        seniorCitizen: {
          id: seniorCitizenId,
        },
      },
    });
  }
}

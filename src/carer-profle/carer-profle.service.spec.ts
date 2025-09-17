import { Test, TestingModule } from '@nestjs/testing';
import { CarerProfleService } from './carer-profle.service';

describe('CarerProfleService', () => {
  let service: CarerProfleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarerProfleService],
    }).compile();

    service = module.get<CarerProfleService>(CarerProfleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

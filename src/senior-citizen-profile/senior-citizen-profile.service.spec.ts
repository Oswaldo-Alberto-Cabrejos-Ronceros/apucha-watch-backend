import { Test, TestingModule } from '@nestjs/testing';
import { SeniorCitizenProfileService } from './senior-citizen-profile.service';

describe('SeniorCitizenProfileService', () => {
  let service: SeniorCitizenProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeniorCitizenProfileService],
    }).compile();

    service = module.get<SeniorCitizenProfileService>(SeniorCitizenProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

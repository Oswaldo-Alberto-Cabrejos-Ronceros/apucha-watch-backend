import { Test, TestingModule } from '@nestjs/testing';
import { SeniorCitizenHealthConditionService } from './senior-citizen-health-condition.service';

describe('SeniorCitizenHealthConditionService', () => {
  let service: SeniorCitizenHealthConditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeniorCitizenHealthConditionService],
    }).compile();

    service = module.get<SeniorCitizenHealthConditionService>(SeniorCitizenHealthConditionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

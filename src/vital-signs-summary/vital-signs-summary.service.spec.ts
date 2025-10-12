import { Test, TestingModule } from '@nestjs/testing';
import { VitalSignsSummaryService } from './vital-signs-summary.service';

describe('VitalSignsSummaryService', () => {
  let service: VitalSignsSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VitalSignsSummaryService],
    }).compile();

    service = module.get<VitalSignsSummaryService>(VitalSignsSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

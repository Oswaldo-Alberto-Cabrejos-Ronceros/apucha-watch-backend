import { Test, TestingModule } from '@nestjs/testing';
import { VitalSignsAlertService } from './vital-signs-alert.service';

describe('VitalSignsAlertService', () => {
  let service: VitalSignsAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VitalSignsAlertService],
    }).compile();

    service = module.get<VitalSignsAlertService>(VitalSignsAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

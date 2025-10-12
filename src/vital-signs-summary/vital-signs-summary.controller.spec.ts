import { Test, TestingModule } from '@nestjs/testing';
import { VitalSignsSummaryController } from './vital-signs-summary.controller';
import { VitalSignsSummaryService } from './vital-signs-summary.service';

describe('VitalSignsSummaryController', () => {
  let controller: VitalSignsSummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VitalSignsSummaryController],
      providers: [VitalSignsSummaryService],
    }).compile();

    controller = module.get<VitalSignsSummaryController>(VitalSignsSummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

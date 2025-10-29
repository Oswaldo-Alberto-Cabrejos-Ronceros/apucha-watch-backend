import { Test, TestingModule } from '@nestjs/testing';
import { VitalSignsAlertController } from './vital-signs-alert.controller';
import { VitalSignsAlertService } from './vital-signs-alert.service';

describe('VitalSignsAlertController', () => {
  let controller: VitalSignsAlertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VitalSignsAlertController],
      providers: [VitalSignsAlertService],
    }).compile();

    controller = module.get<VitalSignsAlertController>(VitalSignsAlertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

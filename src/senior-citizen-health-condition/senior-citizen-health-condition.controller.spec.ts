import { Test, TestingModule } from '@nestjs/testing';
import { SeniorCitizenHealthConditionController } from './senior-citizen-health-condition.controller';
import { SeniorCitizenHealthConditionService } from './senior-citizen-health-condition.service';

describe('SeniorCitizenHealthConditionController', () => {
  let controller: SeniorCitizenHealthConditionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeniorCitizenHealthConditionController],
      providers: [SeniorCitizenHealthConditionService],
    }).compile();

    controller = module.get<SeniorCitizenHealthConditionController>(SeniorCitizenHealthConditionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

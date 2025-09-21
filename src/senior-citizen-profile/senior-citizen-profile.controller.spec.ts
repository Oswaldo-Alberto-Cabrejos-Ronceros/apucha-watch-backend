import { Test, TestingModule } from '@nestjs/testing';
import { SeniorCitizenProfileController } from './senior-citizen-profile.controller';
import { SeniorCitizenProfileService } from './senior-citizen-profile.service';

describe('SeniorCitizenProfileController', () => {
  let controller: SeniorCitizenProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeniorCitizenProfileController],
      providers: [SeniorCitizenProfileService],
    }).compile();

    controller = module.get<SeniorCitizenProfileController>(SeniorCitizenProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

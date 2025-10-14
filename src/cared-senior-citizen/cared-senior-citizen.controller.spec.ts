import { Test, TestingModule } from '@nestjs/testing';
import { CaredSeniorCitizenController } from './cared-senior-citizen.controller';
import { CaredSeniorCitizenService } from './cared-senior-citizen.service';

describe('CaredSeniorCitizenController', () => {
  let controller: CaredSeniorCitizenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaredSeniorCitizenController],
      providers: [CaredSeniorCitizenService],
    }).compile();

    controller = module.get<CaredSeniorCitizenController>(
      CaredSeniorCitizenController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

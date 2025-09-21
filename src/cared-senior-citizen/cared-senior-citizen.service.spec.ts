import { Test, TestingModule } from '@nestjs/testing';
import { CaredSeniorCitizenService } from './cared-senior-citizen.service';

describe('CaredSeniorCitizenService', () => {
  let service: CaredSeniorCitizenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaredSeniorCitizenService],
    }).compile();

    service = module.get<CaredSeniorCitizenService>(CaredSeniorCitizenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

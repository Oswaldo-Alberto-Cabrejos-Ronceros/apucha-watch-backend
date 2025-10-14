import { Test, TestingModule } from '@nestjs/testing';
import { CaredProfileService } from './cared-profile.service';

describe('CaredProfileService', () => {
  let service: CaredProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaredProfileService],
    }).compile();

    service = module.get<CaredProfileService>(CaredProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

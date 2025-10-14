import { Test, TestingModule } from '@nestjs/testing';
import { UbicationService } from './ubication.service';

describe('UbicationService', () => {
  let service: UbicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UbicationService],
    }).compile();

    service = module.get<UbicationService>(UbicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

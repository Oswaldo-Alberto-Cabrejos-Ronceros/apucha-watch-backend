import { Test, TestingModule } from '@nestjs/testing';
import { UbicationController } from './ubication.controller';
import { UbicationService } from './ubication.service';

describe('UbicationController', () => {
  let controller: UbicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UbicationController],
      providers: [UbicationService],
    }).compile();

    controller = module.get<UbicationController>(UbicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

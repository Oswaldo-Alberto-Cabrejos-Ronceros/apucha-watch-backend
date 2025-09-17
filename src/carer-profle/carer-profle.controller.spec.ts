import { Test, TestingModule } from '@nestjs/testing';
import { CarerProfleController } from './carer-profle.controller';
import { CarerProfleService } from './carer-profle.service';

describe('CarerProfleController', () => {
  let controller: CarerProfleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarerProfleController],
      providers: [CarerProfleService],
    }).compile();

    controller = module.get<CarerProfleController>(CarerProfleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

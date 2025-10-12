import { Test, TestingModule } from '@nestjs/testing';
import { CaredProfileController } from './cared-profile.controller';
import { CaredProfileService } from './cared-profile.service';

describe('CaredProfileController', () => {
  let controller: CaredProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaredProfileController],
      providers: [CaredProfileService],
    }).compile();

    controller = module.get<CaredProfileController>(CaredProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

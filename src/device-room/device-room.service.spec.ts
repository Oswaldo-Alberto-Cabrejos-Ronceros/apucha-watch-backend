import { Test, TestingModule } from '@nestjs/testing';
import { DeviceRoomService } from './device-room.service';

describe('DeviceRoomService', () => {
  let service: DeviceRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceRoomService],
    }).compile();

    service = module.get<DeviceRoomService>(DeviceRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

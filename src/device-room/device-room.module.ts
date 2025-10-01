import { Module } from '@nestjs/common';
import { DeviceRoomService } from './device-room.service';

@Module({
  providers: [DeviceRoomService],
  exports: [DeviceRoomService],
})
export class DeviceRoomModule {}

import { Module } from '@nestjs/common';
import { FallService } from './fall.service';
import { FallController } from './fall.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FallEvent } from './entities/fall.entity';
import { FallGateway } from './fall.gateway';
import { DeviceRoomModule } from 'src/device-room/device-room.module';

@Module({
  imports: [TypeOrmModule.forFeature([FallEvent]), DeviceRoomModule],
  controllers: [FallController],
  providers: [FallService, FallGateway],
})
export class FallModule {}

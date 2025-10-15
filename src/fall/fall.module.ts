import { Module } from '@nestjs/common';
import { FallService } from './fall.service';
import { FallController } from './fall.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FallEvent } from './entities/fall.entity';
import { FallGateway } from './fall.gateway';
import { DeviceRoomModule } from 'src/device-room/device-room.module';
import { SeniorCitizenProfileModule } from 'src/senior-citizen-profile/senior-citizen-profile.module';
import { DeviceModule } from 'src/device/device.module';
import { Device } from 'src/device/entities/device.entity';
import { SeniorCitizenProfile } from 'src/senior-citizen-profile/entities/senior-citizen-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FallEvent, Device, SeniorCitizenProfile]),
    DeviceRoomModule,
    SeniorCitizenProfileModule,
    DeviceModule,
  ],
  controllers: [FallController],
  providers: [FallService, FallGateway],
})
export class FallModule {}

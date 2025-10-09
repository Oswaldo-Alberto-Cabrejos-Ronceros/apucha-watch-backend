import { Module } from '@nestjs/common';
import { VitalSignService } from './vital-signs.service';
import { VitalSignController } from './vital-signs.controller';
import { VitalSign } from './entities/vital-sign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VitalSignsGateway } from './vital-signs.gateway';
import { DeviceRoomModule } from 'src/device-room/device-room.module';
import { VitalSignsMqttController } from './vital-signs.mqtt.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VitalSign]), DeviceRoomModule],
  controllers: [VitalSignController, VitalSignsMqttController],
  providers: [VitalSignService, VitalSignsGateway],
})
export class VitalSignsModule {}

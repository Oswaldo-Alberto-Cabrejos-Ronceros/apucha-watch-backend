import { Module } from '@nestjs/common';
import { VitalSignService } from './vital-signs.service';
import { VitalSignController } from './vital-signs.controller';
import { VitalSign } from './entities/vital-sign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VitalSignsGateway } from './vital-signs.gateway';
import { DeviceRoomModule } from 'src/device-room/device-room.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { VitalSignsAlertModule } from 'src/vital-signs-alert/vital-signs-alert.module';
import { VitalSignsAlert } from 'src/vital-signs-alert/entities/vital-signs-alert.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VitalSign, VitalSignsAlert]),
    DeviceRoomModule,
    NotificationsModule,
    VitalSignsAlertModule,
  ],
  controllers: [VitalSignController],
  providers: [VitalSignService, VitalSignsGateway],
})
export class VitalSignsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbicationService } from './ubication.service';
import { UbicationController } from './ubication.controller';
import { Ubication } from './entities/ubication.entity';
import { UbicationGateway } from './ubication.gateway';
import { DeviceRoomModule } from 'src/device-room/device-room.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ubication]), DeviceRoomModule],
  controllers: [UbicationController],
  providers: [UbicationService, UbicationGateway],
  exports: [UbicationService],
})
export class UbicationModule {}

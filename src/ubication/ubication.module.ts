import { Module } from '@nestjs/common';
import { UbicationService } from './ubication.service';
import { UbicationController } from './ubication.controller';

@Module({
  controllers: [UbicationController],
  providers: [UbicationService],
})
export class UbicationModule {}

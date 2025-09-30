import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbicationService } from './ubication.service';
import { UbicationController } from './ubication.controller';
import { Ubication } from './entities/ubication.entity';
import { UbicationGateway } from './ubication.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Ubication])],
  controllers: [UbicationController],
  providers: [UbicationService, UbicationGateway],
  exports: [UbicationService],
})
export class UbicationModule {}

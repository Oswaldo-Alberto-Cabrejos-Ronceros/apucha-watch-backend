import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbicationService } from './ubication.service';
import { UbicationController } from './ubication.controller';
import { Ubication } from './entities/ubication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ubication])],
  controllers: [UbicationController],
  providers: [UbicationService],
  exports: [UbicationService],
})
export class UbicationModule {}

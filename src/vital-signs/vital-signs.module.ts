import { Module } from '@nestjs/common';
import { VitalSignService } from './vital-signs.service';
import { VitalSignController } from './vital-signs.controller';
import { VitalSign } from './entities/vital-sign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VitalSignsGateway } from './vital-signs.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([VitalSign])],
  controllers: [VitalSignController],
  providers: [VitalSignService, VitalSignsGateway],
})
export class VitalSignsModule {}

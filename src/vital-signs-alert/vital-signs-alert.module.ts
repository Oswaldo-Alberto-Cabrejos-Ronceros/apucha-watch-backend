import { Module } from '@nestjs/common';
import { VitalSignsAlertService } from './vital-signs-alert.service';
import { VitalSignsAlertController } from './vital-signs-alert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VitalSignsAlert } from './entities/vital-signs-alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VitalSignsAlert])],
  controllers: [VitalSignsAlertController],
  providers: [VitalSignsAlertService],
})
export class VitalSignsAlertModule {}

import { Module } from '@nestjs/common';
import { VitalSignsSummaryService } from './vital-signs-summary.service';
import { VitalSignsSummaryController } from './vital-signs-summary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VitalSignsSummary } from './entities/vital-signs-summary.entity';
import { VitalSignScredule } from './scredules/vital-signs.scredule';

@Module({
  imports: [TypeOrmModule.forFeature([VitalSignsSummary])],
  controllers: [VitalSignsSummaryController],
  providers: [VitalSignsSummaryService, VitalSignScredule],
})
export class VitalSignsSummaryModule {}

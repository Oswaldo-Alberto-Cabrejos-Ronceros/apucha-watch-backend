import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCondition } from './entities/health-condition.entity';
import { HealthConditionService } from './health-condition.service';
import { HealthConditionController } from './health-condition.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HealthCondition])],
  providers: [HealthConditionService],
  controllers: [HealthConditionController],
  exports: [HealthConditionService],
})
export class HealthConditionModule {}

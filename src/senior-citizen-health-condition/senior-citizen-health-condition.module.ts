import { Module } from '@nestjs/common';
import { SeniorCitizenHealthConditionService } from './senior-citizen-health-condition.service';
import { SeniorCitizenHealthConditionController } from './senior-citizen-health-condition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeniorCitizenHealthCondition } from './entities/senior-citizen-health-condition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeniorCitizenHealthCondition])],
  controllers: [SeniorCitizenHealthConditionController],
  providers: [SeniorCitizenHealthConditionService],
})
export class SeniorCitizenHealthConditionModule {}

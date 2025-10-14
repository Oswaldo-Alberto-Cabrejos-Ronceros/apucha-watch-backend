import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthConditionRecommendation } from './entities/health-condition-recommendation.entity';
import { HealthConditionRecommendationService } from './health-condition-recommendation.service';
import { HealthConditionRecommendationController } from './health-condition-recommendation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HealthConditionRecommendation])],
  controllers: [HealthConditionRecommendationController],
  providers: [HealthConditionRecommendationService],
  exports: [HealthConditionRecommendationService],
})
export class HealthConditionRecommendationModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthRecommendation } from './entities/health-recommendation.entity';
import { HealthRecommendationService } from './health-recommendation.service';
import { HealthRecommendationController } from './health-recommendation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HealthRecommendation])],
  controllers: [HealthRecommendationController],
  providers: [HealthRecommendationService],
  exports: [HealthRecommendationService],
})
export class HealthRecommendationModule {}
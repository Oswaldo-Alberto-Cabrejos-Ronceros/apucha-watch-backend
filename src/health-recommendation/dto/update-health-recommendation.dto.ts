import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthRecommendationDto } from './create-health-recommendation.dto';

export class UpdateHealthRecommendationDto extends PartialType(
  CreateHealthRecommendationDto,
) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthConditionRecommendationDto } from './create-health-condition-recommendation.dto';

export class UpdateHealthConditionRecommendationDto extends PartialType(CreateHealthConditionRecommendationDto) {}

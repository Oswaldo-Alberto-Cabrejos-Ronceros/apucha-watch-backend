import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateHealthConditionRecommendationDto {
  @IsInt()
  @IsNotEmpty()
  healthConditionId: number;

  @IsInt()
  @IsNotEmpty()
  healthRecommendationId: number;
}
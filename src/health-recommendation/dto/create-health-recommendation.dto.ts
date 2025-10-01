import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHealthRecommendationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

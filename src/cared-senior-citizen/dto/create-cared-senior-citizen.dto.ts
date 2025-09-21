import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class CreateCaredSeniorCitizenDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  carerProfileId: number;
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  seniorCitizenProfileId: number;
}

import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class CreateCaredSeniorCitizenDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  caredProfileId: number;
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  seniorCitizenProfileId: number;
}

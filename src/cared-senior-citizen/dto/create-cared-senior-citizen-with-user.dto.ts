import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateCaredProfileWithUserDto {
  @IsNotEmpty()
  userId: string;
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  seniorCitizenProfileId: number;
}

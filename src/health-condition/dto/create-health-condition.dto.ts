import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHealthConditionDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsPositive } from 'class-validator';
import { ConditionSeverity } from '../enums/contition-severity.enum';

export class CreateSeniorCitizenHealthConditionDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  seniorCitizenProfileId: number;
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  healthConditionId: number;
  @Type(() => Date)
  @IsDate()
  diagnosisDate: Date;
  @IsEnum(ConditionSeverity)
  severity: ConditionSeverity;
}

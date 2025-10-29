import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { VitalSignAlertType } from '../enums/vital-sign-alert-type';
import { VitalSignAlertSeverity } from '../enums/vital-sign-alert-severity';

export class CreateVitalSignsAlertDto {
  @IsInt()
  @IsNotEmpty()
  seniorCitizenProfileId: number;

  @IsEnum(VitalSignAlertType)
  type: VitalSignAlertType;

  @IsEnum(VitalSignAlertSeverity)
  severity: VitalSignAlertSeverity;
}

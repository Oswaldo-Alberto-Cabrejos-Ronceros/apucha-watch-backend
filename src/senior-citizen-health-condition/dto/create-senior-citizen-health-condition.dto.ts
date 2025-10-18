import { ConditionSeverity } from '../enums/contition-severity.enum';

export class CreateSeniorCitizenHealthConditionDto {
  seniorCitizenProfileId: number;
  healthConditionId: number;
  diagnosisDate: Date;
  severity: ConditionSeverity;
}

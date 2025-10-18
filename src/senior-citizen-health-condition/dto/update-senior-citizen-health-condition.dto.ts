import { PartialType } from '@nestjs/swagger';
import { CreateSeniorCitizenHealthConditionDto } from './create-senior-citizen-health-condition.dto';

export class UpdateSeniorCitizenHealthConditionDto extends PartialType(CreateSeniorCitizenHealthConditionDto) {}

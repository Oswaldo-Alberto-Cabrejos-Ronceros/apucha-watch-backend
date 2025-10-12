import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthConditionDto } from './create-health-condition.dto';

export class UpdateHealthConditionDto extends PartialType(CreateHealthConditionDto) {}
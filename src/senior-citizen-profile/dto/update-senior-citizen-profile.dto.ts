import { PartialType } from '@nestjs/swagger';
import { CreateSeniorCitizenProfileDto } from './create-senior-citizen-profile.dto';

export class UpdateSeniorCitizenProfileDto extends PartialType(
  CreateSeniorCitizenProfileDto,
) {}

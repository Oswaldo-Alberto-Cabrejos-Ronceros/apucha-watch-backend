import { PartialType } from '@nestjs/swagger';
import { CreateCaredSeniorCitizenDto } from './create-cared-senior-citizen.dto';

export class UpdateCaredSeniorCitizenDto extends PartialType(
  CreateCaredSeniorCitizenDto,
) {}

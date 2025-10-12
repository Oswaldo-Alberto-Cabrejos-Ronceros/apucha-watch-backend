import { PartialType } from '@nestjs/swagger';
import { CreateVitalSignsSummaryDto } from './create-vital-signs-summary.dto';

export class UpdateVitalSignsSummaryDto extends PartialType(
  CreateVitalSignsSummaryDto,
) {}

import { PartialType } from '@nestjs/swagger';
import { CreateVitalSignsAlertDto } from './create-vital-signs-alert.dto';

export class UpdateVitalSignsAlertDto extends PartialType(CreateVitalSignsAlertDto) {}

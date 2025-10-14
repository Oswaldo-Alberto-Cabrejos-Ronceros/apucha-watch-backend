import { PartialType } from '@nestjs/swagger';
import { CreateCaredProfileDto } from './create-cared-profile.dto';

export class UpdateCaredProfileDto extends PartialType(CreateCaredProfileDto) {}

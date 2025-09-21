import { PartialType } from '@nestjs/swagger';
import { CreateCarerProfleDto } from './create-carer-profle.dto';

export class UpdateCarerProfleDto extends PartialType(CreateCarerProfleDto) {}

import { IsNotEmpty, IsUUID, IsDateString, IsNumber } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty()
  @IsUUID()
  code: string;
}

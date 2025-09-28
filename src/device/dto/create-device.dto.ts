import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty()
  @IsUUID()
  code: string;
}

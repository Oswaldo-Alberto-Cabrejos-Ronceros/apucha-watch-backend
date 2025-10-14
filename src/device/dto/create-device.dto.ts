import { IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty()
  code: string;
}

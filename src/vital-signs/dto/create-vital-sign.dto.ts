import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateVitalSignDto {
  @IsString()
  @IsNotEmpty()
  deviceCode: string;

  @Type(() => Date)
  @IsDate()
  timeStamp: Date;

  @IsNumber()
  @IsNotEmpty()
  heartRate: number;

  @IsNumber()
  @IsNotEmpty()
  oxygenSaturation: number;
}

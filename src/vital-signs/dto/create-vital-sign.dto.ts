import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateVitalSignDto {
  @IsString()
  @IsNotEmpty()
  deviceCode: string;

  @IsDate()
  @IsNotEmpty()
  timeStamp: Date;

  @IsNumber()
  @IsNotEmpty()
  heartRate: number;

  @IsNumber()
  @IsNotEmpty()
  oxygenSaturation: number;
}

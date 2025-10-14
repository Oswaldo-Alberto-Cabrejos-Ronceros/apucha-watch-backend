import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVitalSignDto {
  @IsString()
  @IsNotEmpty()
  deviceCode: string;

  @IsNumber()
  @IsNotEmpty()
  heartRate: number;

  @IsNumber()
  @IsNotEmpty()
  oxygenSaturation: number;
}

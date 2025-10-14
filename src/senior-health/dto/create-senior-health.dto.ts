import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class BloodPressureDto {
  @IsNumber()
  systolic: number;

  @IsNumber()
  diastolic: number;
}

export class CreateSeniorHealthDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsNumber()
  heartRate: number;

  @ValidateNested()
  bloodPressure: BloodPressureDto;

  @IsOptional()
  @IsNumber()
  glucoseLevel?: number;

  @IsBoolean()
  fallDetected: boolean;

  @IsBoolean()
  medicationTaken: boolean;
}

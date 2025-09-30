import { IsNotEmpty, IsUUID, IsDateString, IsNumber } from 'class-validator';

export class CreateUbicationDto {
  @IsNotEmpty()
  @IsUUID()
  deviceCode: string;

  @IsNotEmpty()
  @IsDateString()
  timeStamp: Date;

  @IsNotEmpty()
  @IsNumber()
6

  @IsNotEmpty()
  @IsNumber()
  altitude: number;

  @IsNotEmpty()
  @IsNumber()
  speed: number;

  @IsNotEmpty()
  @IsNumber()
  satelites: number;

  @IsNotEmpty()
  @IsNumber()
  hdop: number;
}

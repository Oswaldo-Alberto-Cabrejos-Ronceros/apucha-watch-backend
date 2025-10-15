import { IsNotEmpty } from 'class-validator';

export class CreateFallDto {
  @IsNotEmpty({ message: 'La contraseña no debe estar vacía' })
  deviceCode: string;
  /*  location?: {
    lat: number;
    lon: number;
  };*/
}

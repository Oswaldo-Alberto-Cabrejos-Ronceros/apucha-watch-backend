import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCarerProfleDto {
  @IsNotEmpty()
  @MaxLength(72, { message: 'El nombre es muy largo, máximo 72 caracteres' })
  name: string;
  @IsNotEmpty()
  @MaxLength(72, { message: 'El nombre es muy largo, máximo 72 caracteres' })
  lastname: string;
}

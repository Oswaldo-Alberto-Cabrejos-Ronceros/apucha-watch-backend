import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class CreateCaredProfileDto {
  @IsNotEmpty()
  @MaxLength(72, { message: 'El nombre es muy largo, máximo 72 caracteres' })
  name: string;
  @IsNotEmpty()
  @MaxLength(72, { message: 'El nombre es muy largo, máximo 72 caracteres' })
  lastname: string;
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

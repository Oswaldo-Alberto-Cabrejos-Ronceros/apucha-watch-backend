import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  MaxDate,
  MaxLength,
  MinDate,
} from 'class-validator';

export class CreateSeniorCitizenProfileDto {
  @IsNotEmpty()
  @MaxLength(72, { message: 'El nombre es muy largo, máximo 72 caracteres' })
  name: string;
  @IsNotEmpty()
  @MaxLength(72, { message: 'El nombre es muy largo, máximo 72 caracteres' })
  lastname: string;
  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 60)), {
    message: 'Como mínimo debe tener 60 años',
  })
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 120)), {
    message: 'Como máximo debe tener 120 años',
  })
  birthdate: Date;
}

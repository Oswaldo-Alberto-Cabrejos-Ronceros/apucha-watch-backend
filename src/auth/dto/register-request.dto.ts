import { IsEmail, IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class RegisterRequestDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;
  @IsNotEmpty({ message: 'La contraseña no debe estar vacía' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial',
    },
  )
  password: string;
  @IsNotEmpty()
  @MaxLength(72, { message: 'El nombre es muy largo, máximo 72 caracteres' })
  name: string;
  @IsNotEmpty()
  @MaxLength(72, { message: 'El nombre es muy largo, máximo 72 caracteres' })
  lastname: string;
}

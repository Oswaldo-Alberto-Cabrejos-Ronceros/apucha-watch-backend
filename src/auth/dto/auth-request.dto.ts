import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class AuthRequestDto {
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
}

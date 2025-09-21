import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { IsPublic } from 'src/common/decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @IsPublic()
  @Post('login')
  login(@Body() authRequest: AuthRequestDto) {
    return this.authService.login(authRequest);
  }
  @IsPublic()
  @Post('signup')
  register(@Body() registerRequest: RegisterRequestDto) {
    return this.authService.signUp(registerRequest);
  }
}

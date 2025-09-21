import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() authRequest: AuthRequestDto) {
    return this.authService.login(authRequest);
  }
  @Post('signup')
  register(@Body() registerRequest: RegisterRequestDto) {
    return this.authService.signUp(registerRequest);
  }
}

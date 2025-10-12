import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FallService } from './fall.service';
import { CreateFallDto } from './dto/create-fall.dto';

@Controller('fall')
export class FallController {
  constructor(private readonly fallService: FallService) {}

  @Post('register')
  registrarCaida(@Body() body: CreateFallDto) {
    return this.fallService.registerFallEvent(body);
  }

  @Get(':userId')
  historial(@Param('userId') userId: string) {
    return this.fallService.getFallHistory(userId);
  }
}

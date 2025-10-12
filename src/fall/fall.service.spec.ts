import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FallService } from './fall.service';

@Controller('fall')
export class FallController {
  constructor(private readonly fallService: FallService) {}

  @Post('register')
  registrarCaida(
    @Body()
    body: {
      userId: string;
      timestamp: Date;
      location?: { lat: number; lon: number };
    },
  ) {
    return this.fallService.registerFallEvent(body);
  }

  @Get(':userId')
  historial(@Param('userId') userId: number) {
    return this.fallService.getFallHistory(userId);
  }
}

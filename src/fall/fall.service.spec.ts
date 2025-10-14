import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FallService } from './fall.service';

@Controller('fall')
export class FallController {
  constructor(private readonly fallService: FallService) {}

  @Post('register')
  registrarCaida(
    @Body()
    body: {
      deviceCode: string;
      timestamp: Date;
    },
  ) {
    return this.fallService.registerFallEvent(body);
  }

  @Get(':userId')
  historial(@Param('userId') userId: number) {
    return this.fallService.getFallHistory(userId);
  }
}

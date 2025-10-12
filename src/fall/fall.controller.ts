import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FallService } from './fall.service';
import { CreateFallDto } from './dto/create-fall.dto';

@Controller('fall')
export class FallController {
  constructor(private readonly fallService: FallService) {}

  @Post()
  registrarCaida(@Body() createFallDto: CreateFallDto) {
    return this.fallService.registerFallEvent(createFallDto);
  }

  @Get(':seniorCitizenId')
  historial(@Param('seniorCitizenId', ParseIntPipe) seniorCitizenId: number) {
    return this.fallService.getFallHistory(seniorCitizenId);
  }
}

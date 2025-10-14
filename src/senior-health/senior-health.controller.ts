import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SeniorHealthService } from './senior-health.service';
import { CreateSeniorHealthDto } from './dto/create-senior-health.dto';

@Controller('senior-health')
export class SeniorHealthController {
  constructor(private readonly service: SeniorHealthService) {}

  @Post()
  create(@Body() dto: CreateSeniorHealthDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('alerts/:id')
  checkAlerts(@Param('id') id: number) {
    return this.service.checkAlerts(id);
  }
}

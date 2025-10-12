import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { HealthRecommendationService } from './health-recommendation.service';
import { CreateHealthRecommendationDto } from './dto/create-health-recommendation.dto';
import { UpdateHealthRecommendationDto } from './dto/update-health-recommendation.dto';

@Controller('health-recommendation')
export class HealthRecommendationController {
  constructor(private readonly service: HealthRecommendationService) {}

  @Post()
  create(@Body() createDto: CreateHealthRecommendationDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateHealthRecommendationDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}
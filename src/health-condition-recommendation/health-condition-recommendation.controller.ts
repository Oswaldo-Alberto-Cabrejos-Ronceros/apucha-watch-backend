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
import { HealthConditionRecommendationService } from './health-condition-recommendation.service';
import { CreateHealthConditionRecommendationDto } from './dto/create-health-condition-recommendation.dto';
import { UpdateHealthConditionRecommendationDto } from './dto/update-health-condition-recommendation.dto';

@Controller('health-condition-recommendation')
export class HealthConditionRecommendationController {
  constructor(private readonly service: HealthConditionRecommendationService) {}

  @Post()
  create(@Body() createDto: CreateHealthConditionRecommendationDto) {
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
    @Body() updateDto: UpdateHealthConditionRecommendationDto,
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
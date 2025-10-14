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
import { HealthConditionService } from './health-condition.service';
import { CreateHealthConditionDto } from './dto/create-health-condition.dto';
import { UpdateHealthConditionDto } from './dto/update-health-condition.dto';

@Controller('health-conditions')
export class HealthConditionController {
  constructor(private readonly service: HealthConditionService) {}

  @Post()
  create(@Body() dto: CreateHealthConditionDto) {
    return this.service.create(dto);
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
    @Body() dto: UpdateHealthConditionDto,
  ) {
    return this.service.update(id, dto);
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

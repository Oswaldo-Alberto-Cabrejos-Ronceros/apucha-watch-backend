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
import { CarerProfleService } from './carer-profle.service';
import { CreateCarerProfleDto } from './dto/create-carer-profle.dto';
import { UpdateCarerProfleDto } from './dto/update-carer-profle.dto';

@Controller('carer-profle')
export class CarerProfleController {
  constructor(private readonly carerProfleService: CarerProfleService) {}

  @Post()
  create(@Body() createCarerProfleDto: CreateCarerProfleDto) {
    return this.carerProfleService.create(createCarerProfleDto);
  }

  @Get()
  findAll() {
    return this.carerProfleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carerProfleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarerProfleDto: UpdateCarerProfleDto,
  ) {
    return this.carerProfleService.update(id, updateCarerProfleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carerProfleService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.carerProfleService.restore(id);
  }
}

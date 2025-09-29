import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UbicationService } from './ubication.service';
import { CreateUbicationDto } from './dto/create-ubication.dto';
import { UpdateUbicationDto } from './dto/update-ubication.dto';

@Controller('ubication')
export class UbicationController {
  constructor(private readonly ubicationService: UbicationService) {}

  @Post()
  create(@Body() createUbicationDto: CreateUbicationDto) {
    return this.ubicationService.create(createUbicationDto);
  }

  @Get()
  findAll() {
    return this.ubicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ubicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUbicationDto: UpdateUbicationDto) {
    return this.ubicationService.update(+id, updateUbicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ubicationService.remove(+id);
  }
}

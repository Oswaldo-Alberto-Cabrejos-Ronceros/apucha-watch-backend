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
import { CaredProfileService } from './cared-profile.service';
import { CreateCaredProfileDto } from './dto/create-cared-profile.dto';
import { UpdateCaredProfileDto } from './dto/update-cared-profile.dto';

@Controller('cared-profile')
export class CaredProfileController {
  constructor(private readonly caredProfileService: CaredProfileService) {}

  @Post()
  create(@Body() createCaredProfileDto: CreateCaredProfileDto) {
    return this.caredProfileService.create(createCaredProfileDto);
  }

  @Get()
  findAll() {
    return this.caredProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.caredProfileService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCaredProfileDto: UpdateCaredProfileDto,
  ) {
    return this.caredProfileService.update(id, updateCaredProfileDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.caredProfileService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.caredProfileService.restore(id);
  }
}

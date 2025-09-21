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
import { SeniorCitizenProfileService } from './senior-citizen-profile.service';
import { CreateSeniorCitizenProfileDto } from './dto/create-senior-citizen-profile.dto';
import { UpdateSeniorCitizenProfileDto } from './dto/update-senior-citizen-profile.dto';

@Controller('senior-citizen-profile')
export class SeniorCitizenProfileController {
  constructor(
    private readonly seniorCitizenProfileService: SeniorCitizenProfileService,
  ) {}

  @Post()
  create(@Body() createSeniorCitizenProfileDto: CreateSeniorCitizenProfileDto) {
    return this.seniorCitizenProfileService.create(
      createSeniorCitizenProfileDto,
    );
  }

  @Get()
  findAll() {
    return this.seniorCitizenProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.seniorCitizenProfileService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSeniorCitizenProfileDto: UpdateSeniorCitizenProfileDto,
  ) {
    return this.seniorCitizenProfileService.update(
      id,
      updateSeniorCitizenProfileDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.seniorCitizenProfileService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.seniorCitizenProfileService.restore(id);
  }
}

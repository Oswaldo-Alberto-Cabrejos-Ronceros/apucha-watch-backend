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
import { SeniorCitizenHealthConditionService } from './senior-citizen-health-condition.service';
import { CreateSeniorCitizenHealthConditionDto } from './dto/create-senior-citizen-health-condition.dto';
import { UpdateSeniorCitizenHealthConditionDto } from './dto/update-senior-citizen-health-condition.dto';

@Controller('senior-citizen-health-condition')
export class SeniorCitizenHealthConditionController {
  constructor(
    private readonly seniorCitizenHealthConditionService: SeniorCitizenHealthConditionService,
  ) {}

  @Post()
  create(
    @Body()
    createSeniorCitizenHealthConditionDto: CreateSeniorCitizenHealthConditionDto,
  ) {
    return this.seniorCitizenHealthConditionService.create(
      createSeniorCitizenHealthConditionDto,
    );
  }

  @Get()
  findAll() {
    return this.seniorCitizenHealthConditionService.findAll();
  }

  @Get('senior-citizen/:id')
  findAllBySeniorCitizenId(@Param('id', ParseIntPipe) id: number) {
    return this.seniorCitizenHealthConditionService.findAllBySeniorCitizenId(
      id,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.seniorCitizenHealthConditionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateSeniorCitizenHealthConditionDto: UpdateSeniorCitizenHealthConditionDto,
  ) {
    return this.seniorCitizenHealthConditionService.update(
      +id,
      updateSeniorCitizenHealthConditionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.seniorCitizenHealthConditionService.remove(+id);
  }
}

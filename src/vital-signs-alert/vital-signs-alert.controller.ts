import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { VitalSignsAlertService } from './vital-signs-alert.service';
import { CreateVitalSignsAlertDto } from './dto/create-vital-signs-alert.dto';
import { VitalSignAlertType } from './enums/vital-sign-alert-type';

@Controller('vital-signs-alert')
export class VitalSignsAlertController {
  constructor(
    private readonly vitalSignsAlertService: VitalSignsAlertService,
  ) {}

  @Post()
  create(@Body() createVitalSignsAlertDto: CreateVitalSignsAlertDto) {
    return this.vitalSignsAlertService.create(createVitalSignsAlertDto);
  }

  @Get(':seniorId')
  findAllBySeniorId(@Param('seniorId', ParseIntPipe) seniorId: number) {
    return this.vitalSignsAlertService.findAllBySeniorId(seniorId);
  }

  @Get(':seniorId/:type')
  findAllBySeniorIdAndType(
    @Param('seniorId', ParseIntPipe) seniorId: number,
    @Param('type') type: VitalSignAlertType,
  ) {
    return this.vitalSignsAlertService.findAllBySeniorIdAndType(seniorId, type);
  }

  @Get()
  findAll() {
    return this.vitalSignsAlertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vitalSignsAlertService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vitalSignsAlertService.remove(id);
  }
}

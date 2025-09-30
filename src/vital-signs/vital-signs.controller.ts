import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VitalSignService } from './vital-signs.service';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { UpdateVitalSignDto } from './dto/update-vital-sign.dto';
import { VitalSignsGateway } from './vital-signs.gateway';

@Controller('vital-signs')
export class VitalSignController {
  constructor(
    private readonly vitalSignService: VitalSignService,
    private readonly vitalSignsGateway: VitalSignsGateway,
  ) {}

  @Post()
  create(@Body() createVitalSignDto: CreateVitalSignDto) {
    //emit for websocket
    this.vitalSignsGateway.sendVitalSigns(createVitalSignDto);
    return this.vitalSignService.create(createVitalSignDto);
  }

  @Get()
  findAll() {
    return this.vitalSignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vitalSignService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVitalSignDto: UpdateVitalSignDto,
  ) {
    return this.vitalSignService.update(+id, updateVitalSignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vitalSignService.remove(+id);
  }
}

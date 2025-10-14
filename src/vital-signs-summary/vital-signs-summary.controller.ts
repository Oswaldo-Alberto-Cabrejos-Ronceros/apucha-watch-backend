import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VitalSignsSummaryService } from './vital-signs-summary.service';
import { CreateVitalSignsSummaryDto } from './dto/create-vital-signs-summary.dto';
import { UpdateVitalSignsSummaryDto } from './dto/update-vital-signs-summary.dto';

@Controller('vital-signs-summary')
export class VitalSignsSummaryController {
  constructor(
    private readonly vitalSignsSummaryService: VitalSignsSummaryService,
  ) {}

  @Post()
  create(@Body() createVitalSignsSummaryDto: CreateVitalSignsSummaryDto) {
    return this.vitalSignsSummaryService.create(createVitalSignsSummaryDto);
  }

  @Get()
  findAll() {
    return this.vitalSignsSummaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vitalSignsSummaryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVitalSignsSummaryDto: UpdateVitalSignsSummaryDto,
  ) {
    return this.vitalSignsSummaryService.update(
      +id,
      updateVitalSignsSummaryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vitalSignsSummaryService.remove(+id);
  }
}

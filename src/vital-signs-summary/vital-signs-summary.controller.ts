import { Controller, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VitalSignsSummaryService } from './vital-signs-summary.service';
import { ResolutionVitalSigns } from './enums/resolution.enum';

@Controller('vital-signs-summary')
export class VitalSignsSummaryController {
  constructor(
    private readonly vitalSignsSummaryService: VitalSignsSummaryService,
  ) {}

  @Get()
  findAll() {
    return this.vitalSignsSummaryService.findAll();
  }

  @Get(':deviceCode/:resolution')
  findAllByIdAndResolution(
    @Param('deviceCode') deviceCode: string,
    @Param('resolution') resolution: ResolutionVitalSigns,
  ) {
    return this.vitalSignsSummaryService.findAllByIdAndResolution(
      deviceCode,
      resolution,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vitalSignsSummaryService.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateVitalSignsSummaryDto } from './dto/create-vital-signs-summary.dto';
import { UpdateVitalSignsSummaryDto } from './dto/update-vital-signs-summary.dto';

@Injectable()
export class VitalSignsSummaryService {
  create(createVitalSignsSummaryDto: CreateVitalSignsSummaryDto) {
    return 'This action adds a new vitalSignsSummary';
  }

  findAll() {
    return `This action returns all vitalSignsSummary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vitalSignsSummary`;
  }

  update(id: number, updateVitalSignsSummaryDto: UpdateVitalSignsSummaryDto) {
    return `This action updates a #${id} vitalSignsSummary`;
  }

  remove(id: number) {
    return `This action removes a #${id} vitalSignsSummary`;
  }
}

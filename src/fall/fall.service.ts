import { Injectable } from '@nestjs/common';
import { CreateFallDto } from './dto/create-fall.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FallEvent } from './entities/fall.entity';
import { DeviceService } from 'src/device/device.service';
import { SeniorCitizenProfileService } from 'src/senior-citizen-profile/senior-citizen-profile.service';

@Injectable()
export class FallService {
  constructor(
    @InjectRepository(FallEvent)
    private readonly fallRespository: Repository<FallEvent>,
    private readonly deviceService: DeviceService,
    private readonly seniorCitizenProfileService: SeniorCitizenProfileService,
  ) {}

  async registerFallEvent(dto: CreateFallDto) {
    //find device
    const device = await this.deviceService.findOneByCode(dto.deviceCode);
    const seniorCitizen =
      await this.seniorCitizenProfileService.findOneByDeviceCode(
        dto.deviceCode,
      );

    const withDate = {
      device: {
        id: device.id,
      },
      seniorCitizen: {
        id: seniorCitizen.id,
      },
      timestamp: new Date(),
    };
    const entity = this.fallRespository.create(withDate);
    return await this.fallRespository.save(entity);
  }

  async getFallHistory(seniorCitizenId: number) {
    return await this.fallRespository.find({
      where: {
        seniorCitizen: {
          id: seniorCitizenId,
        },
      },
    });
  }
}

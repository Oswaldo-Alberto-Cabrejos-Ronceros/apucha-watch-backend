import { Controller, Logger } from '@nestjs/common';
import { VitalSignService } from './vital-signs.service';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VitalSignsGateway } from './vital-signs.gateway';

@Controller()
export class VitalSignsMqttController {
  private readonly logger = new Logger(VitalSignsMqttController.name);
  constructor(
    private readonly vitalSignService: VitalSignService,
    private readonly vitalSignsGateway: VitalSignsGateway,
  ) {}
  //subscribe post to topic vital-signs
  @MessagePattern('vital-signs')
  async handleVitalSignMessage(
    @Payload() createVitalSignDto: CreateVitalSignDto,
  ) {
    this.logger.log(
      `Datos de signos vitales recibidos: ${JSON.stringify(createVitalSignDto)}`,
    );
    this.vitalSignsGateway.sendVitalSigns(createVitalSignDto);
    return this.vitalSignService.create(createVitalSignDto);
  }
}

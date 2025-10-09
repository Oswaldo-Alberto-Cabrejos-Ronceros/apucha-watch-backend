import { Logger } from '@nestjs/common';
import { FallGateway } from './fall.gateway';
import { MessagePattern, Payload } from '@nestjs/microservices';

export class FallMqttController {
  private readonly logger = new Logger(FallMqttController.name);
  constructor(private fallGateway: FallGateway) {}
  //suscribe post to topic fall
  @MessagePattern('fall')
  handleFallMessage(@Payload() createFallDto: any) {
    this.logger.log(`Datos de caida recibidos${createFallDto}`);
    this.fallGateway.sendFall(createFallDto);
  }
}

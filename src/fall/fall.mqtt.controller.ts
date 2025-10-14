import { Logger } from '@nestjs/common';
import { FallGateway } from './fall.gateway';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateFallDto } from './dto/create-fall.dto';

export class FallMqttController {
  private readonly logger = new Logger(FallMqttController.name);
  constructor(private fallGateway: FallGateway) {}
  //suscribe post to topic fall
  @MessagePattern('fall')
  handleFallMessage(@Payload() createFallDto: CreateFallDto) {
    this.logger.log(`Datos de caida recibidos${createFallDto.deviceCode}`);
    this.fallGateway.sendFall(createFallDto);
  }
}

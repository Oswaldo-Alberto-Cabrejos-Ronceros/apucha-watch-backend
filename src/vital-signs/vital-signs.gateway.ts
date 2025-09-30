import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { VitalSignsSendDto } from './dto/vital-signs-send.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class VitalSignsGateway {
  @WebSocketServer() server: Server;
  //event for stream vitals-signs
  @SubscribeMessage('vital-signs-data')
  handleVitalSignsData(@MessageBody() data: VitalSignsSendDto) {
    this.server.emit('vital-signs-update', data);
  }
}

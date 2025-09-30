import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UbicationSendDto } from './dto/ubication-send.dto';
@WebSocketGateway({ cors: { origin: '*' } })
export class UbicationGateway {
  @WebSocketServer() server: Server;
  //event stream ubication data
  @SubscribeMessage('ubication-data')
  handleUbicationData(@MessageBody() data: UbicationSendDto) {
    this.server.emit('ubication-update', data);
  }
}

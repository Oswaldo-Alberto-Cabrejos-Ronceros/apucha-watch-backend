import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateFallDto } from './dto/create-fall.dto';
@WebSocketGateway({ cors: { origin: '*' } })
export class FallGateway {
  @WebSocketServer() server: Server;
  //for emit event for fall
  sendFall(data: CreateFallDto) {
    this.server.emit('fall-detected', data);
  }
}

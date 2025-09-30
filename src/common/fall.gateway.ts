import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({ cors: { origin: '*' } })
export class FallGateway {
  @WebSocketServer() server: Server;
  //for emit event for fall
  sendFall(data: any) {
    this.server.emit('fall-detected', data);
  }
}

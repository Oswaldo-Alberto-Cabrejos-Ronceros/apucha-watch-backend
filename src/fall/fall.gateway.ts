import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateFallDto } from './dto/create-fall.dto';
import { DeviceRoomService } from 'src/device-room/device-room.service';
@WebSocketGateway({ cors: { origin: '*' }, transports: ['websocket'] })
export class FallGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly deviceRoomDevice: DeviceRoomService) {}

  @SubscribeMessage('subscribe-fall')
  handleSubscribe(
    @MessageBody() data: { deviceCode: string },
    @ConnectedSocket() client: Socket,
  ) {
    return this.deviceRoomDevice.subscribeToDevice(client, data.deviceCode);
  }

  //for emit event for fall
  sendFall(data: CreateFallDto) {
    this.server.to(data.deviceCode).emit('fall-detected', data);
  }
}

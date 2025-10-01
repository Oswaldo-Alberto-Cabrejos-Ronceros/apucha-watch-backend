import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UbicationSendDto } from './dto/ubication-send.dto';
import { CreateUbicationDto } from './dto/create-ubication.dto';
import { DeviceRoomService } from 'src/device-room/device-room.service';
@WebSocketGateway({ cors: { origin: '*' } })
export class UbicationGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly deviceRoomDevice: DeviceRoomService) {}

  @SubscribeMessage('subscribe')
  handleSubscribe(
    @MessageBody() data: { deviceId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Suscribiendose con:' + data.deviceId);
    return this.deviceRoomDevice.subscribeToDevice(client, data.deviceId);
  }
  sendUbication(data: CreateUbicationDto) {
    const ubicationSend = {
      latitude: data.latitude,
      longitude: data.longitude,
    } as UbicationSendDto;
    this.server.to(data.deviceCode).emit('ubication-update', ubicationSend);
  }
}

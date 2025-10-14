import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { VitalSignsSendDto } from './dto/vital-signs-send.dto';
import { CreateVitalSignDto } from './dto/create-vital-sign.dto';
import { DeviceRoomService } from 'src/device-room/device-room.service';

@WebSocketGateway({
  cors: { origin: '*', methods: ['GET', 'POST'], credentials: true },
  transports: ['websocket'],
})
export class VitalSignsGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly deviceRoomDevice: DeviceRoomService) {}

  @SubscribeMessage('subscribe')
  handleSubscribe(
    @MessageBody() data: { deviceCode: string },
    @ConnectedSocket() client: Socket,
  ) {
    return this.deviceRoomDevice.subscribeToDevice(client, data.deviceCode);
  }

  sendVitalSigns(data: CreateVitalSignDto) {
    const vitalSignsSend = {
      heartRate: data.heartRate,
      oxygenSaturation: data.oxygenSaturation,
    } as VitalSignsSendDto;
    this.server.to(data.deviceCode).emit('vital-signs-update', vitalSignsSend);
  }
}

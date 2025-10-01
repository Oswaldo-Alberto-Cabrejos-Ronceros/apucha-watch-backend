import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class DeviceRoomService {
  subscribeToDevice(client: Socket, deviceId: string) {
    void client.join(deviceId);
    console.log('Conectandose con ' + deviceId);
    return { event: 'subscribed', deviceId };
  }
}

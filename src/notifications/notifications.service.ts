import { Inject, Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { getMessaging } from 'firebase-admin/messaging';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App,
  ) {}

  async sendNotification(token: string, title: string, body: string) {
    const message = {
      notification: { title, body },
      token: token,
    };
    try {
      await getMessaging(this.firebaseApp).send(message);
      console.log('Mensaje enviado correctamente', token, title, body);
      return { success: true, body };
    } catch (e) {
      this.logger.error(`Error al enviar notificacion ${e}`);
      return { success: false };
    }
  }
}

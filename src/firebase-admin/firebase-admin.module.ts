import { Global, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        const serviceAccount = JSON.parse(
          process.env.FIREBASE_CONFIG!,
        ) as admin.ServiceAccount;
        if (serviceAccount === undefined) {
          throw new Error(
            'Variable de entorno no encontrado para crear admin de firebase',
          );
        }
        return initializeApp({
          credential: cert(serviceAccount),
        });
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseAdminModule {}

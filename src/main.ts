import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { TypeORMNotFoundInterceptor } from './common/interceptors/typeorm-not-found.interceptor';

import { SupabaseAuthService } from './supabase/supabase-auth.service';
import { AuthenticationSocketIoAdapter } from './common/adapters/authentication-socket-io.adapter';
import { SocketAuthMiddleware } from './common/middlewares/socket-auth.middleware';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //for register socketMiddleware global
  const supabaseAuthService = app.get(SupabaseAuthService);
  const socketAuthMiddleware = new SocketAuthMiddleware(supabaseAuthService);
  app.useWebSocketAdapter(
    new AuthenticationSocketIoAdapter(app, socketAuthMiddleware),
  );

  //apply middleware
  //interceptors and pipes globals
  app.useGlobalInterceptors(new TypeORMNotFoundInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const documentationConfig = new DocumentBuilder()
    .setTitle('ApuchaWatchAPI')
    .setVersion('1.0')
    .setDescription('API for ApuchaWatch application')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    documentationConfig,
  );
  SwaggerModule.setup('api', app, swaggerDocument);
  //enable mqtt
  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883',
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { TypeORMNotFoundInterceptor } from './common/interceptors/typeorm-not-found.interceptor';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SupabaseAuthService } from './supabase/supabase-auth.service';
import { SocketAuthMiddleware } from './common/middlewares/socket-auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //for register socketMiddleware global
  //socket io con cors
  const adapter = new IoAdapter(app);
  app.useWebSocketAdapter(adapter);
  //get supabaseAuthService
  const supabaseAuthService = app.get(SupabaseAuthService);
  const socketAuthMiddleware = new SocketAuthMiddleware(supabaseAuthService);
  //access to native server nest
  const httpServer = app.getHttpServer();
  const io = require('socket.io')(httpServer, {
    cors: { origin: '*' },
  });
  //apply middleware
  io.use =(socketAuthMiddleware.use);
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
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

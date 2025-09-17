import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

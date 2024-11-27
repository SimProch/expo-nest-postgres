import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from './api/api.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Meddi API')
    .setDescription('Meddi API Description')
    .setVersion('1.0')
    .addTag('Meddi API')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
      include: [ApiModule],
    });

  SwaggerModule.setup('swagger/api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    allowedHeaders: 'Content-Type, Access-Control-Allow-Headers, Authorization',
    credentials: true,
  });

  app.use('/public', express.static('public'));

  const config = new DocumentBuilder()
    .setTitle('Travel planner')
    .setDescription('REST API for planning your next trip')
    .setVersion('1.0')
    .addTag('travel')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(
    `📚 API documentation available at: http://localhost:${port}/docs`,
  );
}

bootstrap();

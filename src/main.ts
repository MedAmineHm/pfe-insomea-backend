import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement à partir de backend.env
dotenv.config({ path: 'backend.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Configuration CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3001);
}

bootstrap();

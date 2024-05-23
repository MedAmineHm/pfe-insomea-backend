import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement à partir de backend.env
dotenv.config({ path: 'backend.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Configuration CORS
  const FRONTEND_URL = process.env.FRONTEND_URL;
  app.enableCors({
    origin: FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3001);
}

bootstrap();

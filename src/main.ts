import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Charger les variables d'environnement à partir de backend.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(3001);
}

bootstrap();

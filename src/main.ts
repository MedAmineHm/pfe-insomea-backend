import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS pour toutes les routes
  app.enableCors({
    origin: 'http://48.217.208.238:3000',
  });

  await app.listen(3001);
}
bootstrap();

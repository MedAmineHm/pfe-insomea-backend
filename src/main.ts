import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: 'http://48.217.208.238:3000', // Utilisez l'adresse IP de votre application React avec le port 3000
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Active l'échange de cookies cross-domain si nécessaire
    }),
  );

  await app.listen(3001); // Écoute sur le port 3001 pour votre application Nest.js
  console.log('Server is running on port 3001');
}
bootstrap();

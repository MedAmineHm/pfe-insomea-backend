import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Utilisation de CORS pour autoriser les requêtes depuis l'application React
  app.use(
    cors({
      origin: 'http://example.com', // Remplacez example.com par le nom de domaine ou l'IP externe de votre application React
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }),
  );

  // Écoute du port 3001
  await app.listen(3001);
  console.log('Server is running on port 3001');
}

bootstrap();

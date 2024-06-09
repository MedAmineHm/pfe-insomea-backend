import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: 'http://48.217.208.238:80', // Remplacez par l'IP externe et le port de votre application React
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Active l'échange de cookies cross-domain si nécessaire
    }),
  );

  // Update the environment variables with the external IPs
  process.env.MONGO_URI =
    'mongodb://amine:Hamidou123@<EXTERNAL-IP-MONGODB>:27017/?retryWrites=true&w=majority&appName=Cluster0';
  process.env.REDIS_HOST = '48.217.215.166';
  process.env.REDIS_PORT = '6379';

  await app.listen(3001); // Écoute sur le port 3001 pour votre application Nest.js
  console.log('Server is running on port 3001');
}
bootstrap();

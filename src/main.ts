import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: 'http://48.217.208.238:80', // Remplacez <EXTERNAL-IP-OF-REACT-APP> par l'IP externe ou le domaine
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }),
  );

  await app.listen(3001);
  console.log('Server is running on port 3001');
}
bootstrap();

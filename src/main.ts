import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors'; // Importez le module cors

// Charger les variables d'environnement à partir de backend.env
dotenv.config({ path: 'backend.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS avec les options par défaut
  app.use(cors());

  await app.listen(3001);
}

bootstrap();

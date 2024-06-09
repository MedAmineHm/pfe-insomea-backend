import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      credentials: true,
    }),
  );

  await app.listen(3001);
  console.log('Server is running on port 3001');
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as cors from 'cors';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(3001);
}
bootstrap();

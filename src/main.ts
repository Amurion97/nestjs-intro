import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {INestApplication, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app:INestApplication = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log("NestJS started on port 3000")
}
bootstrap();

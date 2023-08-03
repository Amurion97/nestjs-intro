import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {INestApplication} from "@nestjs/common";
import {useContainer} from 'class-validator';

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    app.enableCors();
    useContainer(app.select(AppModule), {fallbackOnErrors: true});
    await app.listen(3000);
    console.log("NestJS started on port 3000")
}

bootstrap();

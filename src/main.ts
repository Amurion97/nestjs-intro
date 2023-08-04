import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {INestApplication} from "@nestjs/common";
import {useContainer} from 'class-validator';
import {LoggerMiddleware} from "./common/middleware/logger.middleware";

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    app.enableCors();
    //enable container to globally DI
    useContainer(app.select(AppModule), {fallbackOnErrors: true});
    await app.listen(3000);
    console.log("NestJS started on port 3000")
}

bootstrap();

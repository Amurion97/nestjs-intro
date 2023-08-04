import {MiddlewareConsumer, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';

import {SongsModule} from './songs/songs.module';
import {UsersModule} from './users/users.module';
import {AuthModule} from "./auth/auth.module";
import {LoggerMiddleware} from "./common/middleware/logger.middleware";
import { RolesModule } from './roles/roles.module';

@Module({
    imports: [SongsModule, UsersModule, AuthModule, RolesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*');
    }
}

import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {DatabaseModule} from "../database/database.module";
import {userProviders} from "./entities/user.providers";
import {IsUserAlreadyExist} from "./decorators/user.exist.decorator";

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [...userProviders, UsersService, IsUserAlreadyExist],
    exports: [UsersService]
})
export class UsersModule {
}

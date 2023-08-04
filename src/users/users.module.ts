import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {DatabaseModule} from "../database/database.module";
import {userProviders} from "./entities/user.providers";
import {IsUsernameAlreadyExist} from "./decorators/user.exist.decorator";
import {IsEmailAlreadyExist} from "./decorators/email.exist.decorator";

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [...userProviders, UsersService, IsUsernameAlreadyExist, IsEmailAlreadyExist],
    exports: [UsersService]
})
export class UsersModule {
}

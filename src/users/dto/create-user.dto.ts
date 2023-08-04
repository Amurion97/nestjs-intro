import {IsEmail, IsNotEmpty, IsString, Validate} from "class-validator";
import {IsUsernameAlreadyExist} from "../decorators/user.exist.decorator";
import {IsEmailAlreadyExist} from "../decorators/email.exist.decorator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Validate(IsUsernameAlreadyExist)
    username: string;
    @IsNotEmpty()
    @IsEmail()
    @Validate(IsEmailAlreadyExist)
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}

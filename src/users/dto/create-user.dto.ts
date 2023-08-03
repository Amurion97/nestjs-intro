import {IsEmail, IsNotEmpty, IsString, Validate} from "class-validator";
import {IsUserAlreadyExist} from "../decorators/user.exist.decorator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Validate(IsUserAlreadyExist)
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}

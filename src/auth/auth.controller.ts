import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request, ValidationPipe,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Public} from './decorators/public.decorator';
import {SignInDto} from "./dto/sign-in.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body(ValidationPipe) signInDto: SignInDto) {
        console.log("AuthController - signIn - signInDto:", signInDto.username, signInDto.password)
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}

import * as bcrypt from "bcrypt";
import {bcryptConstants} from "./constants";

import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../users/users.service';


@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async signIn(username, pass) {
        const user = await this.usersService.findOneByUsername(username);
        const correctPassword = await bcrypt.compare(pass, user.password)
        // console.log("AuthService - signIn - user:", user, pass)
        if (!correctPassword) {
            throw new UnauthorizedException();
        }
        const payload = {username: user.username, sub: user.userId};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

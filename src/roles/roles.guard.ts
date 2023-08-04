import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<number[]>('roles', context.getHandler());
        console.log("RolesGuard - canActivate - roles:", roles)
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // const hasRole = () =>
        //this is for many-to-many relationship between user and role
        // user.roles.some(role => !!roles.find(item => item === role));

        return user && user.role && roles.includes(user.role);
    }
}

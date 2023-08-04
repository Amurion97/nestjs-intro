import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {IS_PUBLIC_KEY} from "../auth/decorators/public.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            // 💡 See this condition
            return true;
        }

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

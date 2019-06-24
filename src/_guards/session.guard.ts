import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class SessGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {

        const request = context.switchToHttp().getRequest();

        return (request.session.isLoggedIn) ? true : false;
    }

    async checkClientSession(req: any){

        return true;
    };
}
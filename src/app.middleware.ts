import { Injectable, CanActivate, ExecutionContext, Inject, NestMiddleware } from "@nestjs/common";
import { UsersService } from "./users/users.service";
import { Observable } from "rxjs";


@Injectable()
export class JWTChecker implements NestMiddleware{

    constructor(private readonly userService : UsersService){}

    async use(request: Request, response: Response, next: Function){

        const headers : any = request.headers;
        
        const body = request.body;

        const api_key = (headers.authorization) ? headers.authorization.substr(7) : null;

        const app_token = await this.userService.getUserAppToken(api_key);

        console.log({
            body:body,
            app_token : app_token
        });
        
        next();
    }
}
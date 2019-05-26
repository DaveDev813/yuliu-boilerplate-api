import { Injectable, NestMiddleware, BadRequestException, Req, Res, HttpException, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users/users.service";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JWTChecker implements NestMiddleware{

    constructor(private readonly userService : UsersService){}

    async use(@Req() request, @Res() response, next: Function){

        const headers = request.headers;
        const body = request.body;
        const api_key = (headers.authorization) ? headers.authorization.substr(7) : null;
        const bearer = await this.userService.getUserAppToken(api_key);
        const app_token = bearer.app_token;
        
        /** Validate JWT */
        jwt.verify(body._d, app_token, function(err, decoded){
            
            if(err){
                next(new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: 'Payload could not be resolved...',
                }, 403));
            }
            request.body = decoded;
            next();
        });
    }
}
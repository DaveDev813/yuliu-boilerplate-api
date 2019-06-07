import { Injectable, NestMiddleware, Req, Res, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { UsersService } from "./users/users.service";
import moment = require("moment");
import jwt = require("jsonwebtoken");
import fs = require("fs");

@Injectable()
export class JWTChecker implements NestMiddleware{

    constructor(private readonly userService : UsersService){}

    async use(@Req() request, @Res() response, next: Function){

        const headers = request.headers;
        const body = request.body;
        const api_key = (headers.authorization) ? headers.authorization.substr(7) : null;
        const bearer = await this.userService.getUserInfoByAPIKey(api_key);
        const app_token = bearer.app_token;
        
        /**
         * Checks if the token is still valid
         * */
        if(moment().isAfter(moment(bearer.app_token_validity))){
            throw new UnauthorizedException("Token is Expired..");
        }        

        /** Validate JWT */
        jwt.verify(body._d, app_token, function(err, decoded){
            
            if(err){ next(new UnauthorizedException(err), 403); }

            request.body = decoded;

            next();
        });
    }
}

@Injectable()
export class Logger implements NestMiddleware{

    constructor(){}

    async use(@Req() request, @Res() response, next: Function){
        
        const file = `logs/${moment().format("MM-DD-YYYY")}.log`;        
        const requestData = `[${moment().format("HH:mm:ss")}] ${JSON.stringify({ header : request.headers, body : request.body })}\r\n`;

        if(!fs.existsSync(`logs/`)){
            fs.mkdirSync(`logs/`);
        }

        fs.writeFile(file, requestData, { flag : "a+" }, (err) => {

            if(err){ next(new BadRequestException(err.message)); }
            
            next();
        });
    }
}
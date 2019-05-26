import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Req } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { Users } from './users/users.entity';
import * as moment from 'moment';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy){
    
  constructor(
    private readonly userService : UsersService){
    super();
  }

  async validate(apiKey : string){

    const bearer : Users = await this.userService.getUserInfoByAPIKey(apiKey);

    /**
     * Check if the Api key is valid
     */
    if(!bearer){
      throw new UnauthorizedException("Invalid API Key");
    }

    /**
     * Checks if the Api key is still valid
     * */
    if(moment().isAfter(moment(bearer.api_key_validity))){
      throw new UnauthorizedException("API Key is Expired");
    }

    return true;
  }

}
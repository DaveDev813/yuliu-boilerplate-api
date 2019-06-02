import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { signInDto, newUserDto } from './dto/users.dto';

@Injectable()
export class UsersService{

    constructor(
        @Inject('USER_REPOSITORY') private readonly userRepository : Repository<Users>
    ){}

    async getUserInfoByAPIKey(key : string){

        return await this.userRepository
        .createQueryBuilder()
        .select()
        .where("api_key = :key", { key : key })
        .getOne();
    }

    async registerUser(user : newUserDto){
        
        return await this.userRepository.insert(user);
    }

    async getUser(creds : signInDto){

        return await this.userRepository
        .createQueryBuilder()
        .select()
        .where({app_id : creds.app_id, api_key : creds.api_key })
        .getOne();
    }
}

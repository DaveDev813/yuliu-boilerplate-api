import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { signInDto, newUserDto } from './dto/users.dto';
import * as uniqid from 'uniqid';

@Injectable()
export class UsersService{

    constructor(
        @Inject('USER_REPOSITORY') private readonly userRepository : Repository<Users>
    ){

    }

    async validateSessToken(sess_key : string){

        return await this.userRepository
        .createQueryBuilder()
        .where(" api_sess_key = :sess_key", { sess_key : sess_key})
        .getCount()
    }

    async signInUser(id : string){

        let api_sess_key = uniqid();
        let result = await this.userRepository
        .createQueryBuilder()
        .update(Users)
        .set({ api_sess_key : api_sess_key, is_logged_in : true })
        .where("id = :id", {id : id}).execute();

        return { api_sess_key : api_sess_key, result : result }
    }

    async signOutUser(id : string, api_sess_key : string){

        return await this.userRepository
        .createQueryBuilder()
        .update(Users).set({is_logged_in : false})
        .where("api_sess_key = :key", { key : api_sess_key})
        .where("id = :id", { id : id}).execute();
    }

    async registerUser(user : newUserDto){

        return await this.userRepository.insert(user);
    }

    async findOneByApiKey(api_key : string){
        
        return await this.userRepository
        .createQueryBuilder()
        .select()
        .where({api_key:api_key})
        .getCount();
    }

    async getUser(creds : signInDto){

        return await this.userRepository
        .createQueryBuilder()
        .select()
        .where({app_id : creds.app_id, api_key : creds.api_key })
        .getOne();
    }
}

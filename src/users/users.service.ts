import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { signInDto, newUserDto } from './dto/users.dto';

@Injectable()
export class UsersService{

    constructor(
        @Inject('USER_REPOSITORY') private readonly userRepository : Repository<Users>
    ){

    }

    async getUserAppToken(key : string){

        return await this.userRepository
        .createQueryBuilder()
        .select()
        .where("api_key = :key", { key : key })
        .getOne();
    } 

    async getUserInfoByAPIKey(key : string){

        return await this.userRepository
        .createQueryBuilder()
        .select()
        .where("api_key = :key", { key : key })
        .getOne();
    }

    async validateSessToken(sess_key : string){

        /**
         * Validate origin
         */

         return await this.userRepository
        .createQueryBuilder()
        .where("api_sess_key = :sess_key", { sess_key : sess_key})
        .getCount()
    }

    async signInUser(id : string){

        return [];
        // let api_sess_key = uniqid();
        // let expiry = moment().format("MM-DD-YYYY HH:mm:ss").toString();
        
        // let result = await this.userRepository        
        // .createQueryBuilder()
        // .update(Users)
        // .set({ 
        //     api_sess_key : api_sess_key, 
        //     session_expires_at : expiry,
        //     is_logged_in : true
        //  })
        // .where("id = :id", {id : id})
        // .execute();

        // return { 
        //     session_expires_at : expiry,
        //     api_sess_key : api_sess_key, 
        //     result : result 
        // }
    }

    async signOutUser(id : string, api_sess_key : string){

        return [];
        // return await this.userRepository
        // .createQueryBuilder()
        // .update(Users).set({is_logged_in : false})
        // .where("api_sess_key = :key", { key : api_sess_key})
        // .where("id = :id", { id : id}).execute();
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

import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import { newClientDto } from './dto/newClient.dto';

@Injectable()
export class ClientsService{
    
    constructor(
        @Inject('CLIENT_REPOSITORY') private readonly clientRespository : Repository<Clients>
    ){

    }

    async createClient(client : newClientDto){

        return await this.clientRespository.insert(client);
    }

    updateClient(id : number){

    }

    async getAllClient(offset ?: number, limit ?: number){
        
        return await this.clientRespository.find();
    }

    getClientInfo(id : number){

    }

    findClient(keyword : string, offset ?: number, limit ?: number){

    }


}

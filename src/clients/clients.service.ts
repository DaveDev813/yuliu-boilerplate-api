import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import { newClientDto, updateClientDto, searchClientDto } from './dto/client.dto';

@Injectable()
export class ClientsService{
    
    constructor(
        @Inject('CLIENT_REPOSITORY') private readonly clientRespository : Repository<Clients>
    ){

    }

    async createClient(client : newClientDto){

        return await this.clientRespository.insert(client);
    }

    async updateClient(id : string, revisions : updateClientDto){

        return await this.clientRespository.update(id, revisions);
    }

    async disableClient(id : string){

        let client = await this.getClientInfo(id);

        // client.is_disabled = true;

        return await this.clientRespository.update(id, client);
    }

    async getClientInfo(id : string){
        
        return await this.clientRespository.findOne(id);
    }

    async getClients(options : searchClientDto){

        let query = this.clientRespository.createQueryBuilder();

        query.offset(options.offset * options.limit)

        query.limit(options.limit);

        if(options.keyword){
        
            query.where({
                firstname  : options.keyword,
                middlename : options.keyword,
                lastname   : options.keyword,
                email      : options.keyword,
                contact_no : options.keyword                
            })            
        }

        return await query.execute();
    }
}

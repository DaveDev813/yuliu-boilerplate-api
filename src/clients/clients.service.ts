import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import { newClientDto, updateClientDto } from './dto/client.dto';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';
import { CommonQueries } from 'src/_commons/crud.orm';

@Injectable()
export class ClientsService{

    private searchColumns = ["firstname", "middlename", "lastname", "email", "contact_no"];

    constructor(
        private readonly commons : CommonQueries,
        @Inject('CLIENT_REPOSITORY') private readonly clientRespository : Repository<Clients>){

        this.commons.query(this.clientRespository);
    }

    async getClientInfoById(identity : primaryIdDto ){
        
        return await this.clientRespository.findOne(identity.id);
    }

    async getClients(options : searchDto){
                
        const result = await this.commons.read(Number(options.limit), Number(options.offset), options.keyword, this.searchColumns);

        return result;
    }

    async createClient(client : newClientDto){

        const result = await this.commons.create(client);

        return result;
    }

    async updateClient(id : string, revisions : updateClientDto){

        const result = await this.commons.update(Number(id), revisions);

        return result;
    }

    async deleteClient(id : string){

        const result = await this.commons.delete(Number(id));

        return result;
    }
}

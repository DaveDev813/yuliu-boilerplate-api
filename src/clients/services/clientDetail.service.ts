import { Injectable, Inject } from '@nestjs/common';
import { Repository, InsertResult } from 'typeorm';
import { NewClientDto, UpdateClientDto } from '../dto/client.dto';
import { searchDto } from 'src/_commons/commons.dto';
import { CommonQueries } from 'src/_commons/commons.orm';
import { Clients_Information } from '../entities/clients.entity';
import { Client_Accounts } from '../entities/clientAccounts.entity';
import md5 from 'md5';

@Injectable()
export class ClientsService{
    private searchColumns = [
        'firstname',
        'middlename',
        'lastname',
        'email',
        'contact_no',
      ];
    
    constructor(
        private readonly commons: CommonQueries,
        @Inject('CLIENT_ACCOUNT_REPOSITORY')
        private readonly clientAccount: Repository<Client_Accounts>,
        @Inject('CLIENT_INFO_REPOSITORY')
        private readonly clientInformation: Repository<Clients_Information>,
    ) {
        this.commons.query(this.clientInformation);
    }

    async registerNewClient(email: string, password: string) : number | Promise<number>{

        const result = await this.clientAccount.insert({ email : email, password : password });


    }

  async authenticateClientAccount(email: string, password: string){

    const account = await this.clientAccount.createQueryBuilder().select().where({ email : email, password : md5(password) }).getOne();

    return account;
  }



  async getClientInfoById(identity: number) {
    return await this.clientInformation.findOne(identity);
  }

  async getClients(options: searchDto) {
    return await this.commons.read(options, this.searchColumns);
  }

  async createClient(client: NewClientDto) {
    return await this.commons.insert(client);
  }

  async updateClient(id: number, revisions: UpdateClientDto) {
    return await this.commons.update(Number(id), revisions);
  }

  async deleteClient(id: string) {
    return await this.commons.delete(Number(id));
  }
}

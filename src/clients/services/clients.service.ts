import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clients } from '../entities/clients.entity';
import { NewClientDto, UpdateClientDto } from '../dto/client.dto';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';
import { CommonQueries } from 'src/_commons/commons.orm';

@Injectable()
export class ClientsService {
  private searchColumns = [
    'firstname',
    'middlename',
    'lastname',
    'email',
    'contact_no',
  ];

  constructor(
    private readonly commons: CommonQueries,
    @Inject('CLIENT_REPOSITORY')
    private readonly clientRespository: Repository<Clients>,
  ) {
    this.commons.query(this.clientRespository);
  }

  async getClientInfoById(identity: number) {
    return await this.clientRespository.findOne(identity);
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

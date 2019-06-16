import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import { NewClientDto, UpdateClientDto } from './dto/client.dto';
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
    const result = await this.commons.read(
      Number(options.limit),
      Number(options.offset),
      options.keyword,
      this.searchColumns,
    );

    return result;
  }

  async createClient(client: NewClientDto) {
    const result = await this.commons.insert(client);

    return result;
  }

  async updateClient(id: string, revisions: UpdateClientDto) {
    const result = await this.commons.update(Number(id), revisions);

    return result;
  }

  async deleteClient(id: string) {
    const result = await this.commons.delete(Number(id));

    return result;
  }
}

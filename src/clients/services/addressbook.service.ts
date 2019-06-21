import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client_Address_Book } from '../entities/clients.entity';
import { CommonQueries } from 'src/_commons/commons.orm';
import { UpdateAddressDto, NewClientAddressDto } from '../dto/address.dto';
import { searchDto } from '../../_commons/commons.dto';

@Injectable()
export class AddressbookService {
  constructor(
    private readonly common: CommonQueries,
    @Inject('CLIENT_ADDRESS_REPOSITORY')
    private readonly clientAddressRepository: Repository<Client_Address_Book>,
  ) {
    this.common.query(this.clientAddressRepository);
  }

  async getClientAdress(options: searchDto) {
    return await this.common.read(options);
  }

  async getAddressById(clientId: number) {
    return await this.clientAddressRepository.findOne(clientId);
  }

  async createAddressBook(client: NewClientAddressDto) {
    return await this.common.insert(client);
  }

  async updateAddressBook(clientId: number, data: UpdateAddressDto) {
    return await this.common.update(clientId, data);
  }

  async deleteAddressBook(clientID) {
    return await this.common.delete(clientID);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client_Address_Book } from '../entities/clients.entity';
import { CommonQueries } from 'src/_commons/commons.orm';
import { updateAddressDto, newClientAddressDto } from '../dto/address.dto';

@Injectable()
export class AddressbookService {

    constructor(
        private readonly common : CommonQueries,
        @Inject('CLIENT_ADDRESS_REPOSITORY') 
        private readonly clientAddressRepository : Repository<Client_Address_Book>
    ) {
        this.common.query(this.clientAddressRepository);
    }
    async getAddressById(clientId: number) {
        console.log(clientId)
        return await this.clientAddressRepository.findOne(clientId);
    }

    async createAddressBook(client: newClientAddressDto) {
        return await this.common.insert(client);
    }

    async updateAddressBook(clientId: number, data: updateAddressDto) {
        return await this.common.update(clientId, data);
    }

    async deleteAddressBook(clientID) {
        return await this.common.delete(clientID);
    }
}

import {
  Controller,
  Post,
  Param,
  Put,
  Get,
  Body,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './services/clients.service';
import { newClientDto } from './dto/client.dto';
import { AddressbookService } from './services/addressbook.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { BadRequestException, UseGuards } from '@nestjs/common';
import faker = require('faker');
import _ = require('lodash');
import { updateAddressDto } from './dto/address.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Address Book')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('client/addressbook')
export class AddressbookController {
  constructor(
    private readonly addressbookService: AddressbookService,
    private readonly clientService: ClientsService,
  ) {}

  /**
   * @param clientID
   * Search address using clientID
   */

  @Post('clients/:id')
  async getAddressById(@Param('id') clientID: number) {
    if (!clientID) {
      throw new BadRequestException('Client ID is required');
    }

    return await this.addressbookService.getAddressById(clientID);
  }

  @Put('update/:id')
  async updateAddressBook(
    @Param('id') id: number,
    @Body() changes: updateAddressDto,
  ) {
    const address_book = await this.addressbookService.getAddressById(id);

    if (!address_book) {
      throw new BadRequestException('Client ID mismatch.');
    }

    return await this.addressbookService.updateAddressBook(id, changes);
  }

  @Post('create')
  async CreateAddressBook(@Body() clientAddress: any) {
    return await this.addressbookService.createAddressBook(clientAddress);
  }

  @Delete(':id')
  async deleteAddressBookById(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('Client ID is required');
    }

    return await this.addressbookService.deleteAddressBook(id);
  }

  @Post('create/faker')
  async CreateAddressBookFaker() {
    var fakeAddress = {
      client_id: faker.random.number(),
      full_name: faker.name.findName(),
      mobile_no: faker.phone.phoneNumberFormat(),
      address: faker.address.streetAddress(),
      barangay: faker.address.streetName(),
      city: faker.address.city(),
      province: faker.address.state(),
      last_transaction_date: faker.date.recent(),
      last_date_updated: faker.date.recent(-1),
      date_created: faker.date.recent(-1),
    };

    return await this.addressbookService.createAddressBook(fakeAddress);
  }
}

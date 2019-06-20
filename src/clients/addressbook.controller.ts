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
<<<<<<< HEAD
import { UpdateAddressDto, NewClientAddressDto } from './dto/address.dto';
import { AuthGuard } from '@nestjs/passport';
import { searchDto } from '../_commons/commons.dto';

@ApiUseTags('Address Book')
// @ApiBearerAuth()
// @UseGuards(AuthGuard())
@Controller('addressbook')
=======
import { updateAddressDto } from './dto/address.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Address Book')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('client/addressbook')
>>>>>>> 7eda320dbc7a67787b9834b61a1e7d1704b605c8
export class AddressbookController {
  constructor(
    private readonly addressbookService: AddressbookService,
    private readonly clientService: ClientsService,
  ) {}

  /**
   * @param clientID
   * Search address using clientID
   */
<<<<<<< HEAD
  @Post()
  async getClients(@Body() options: searchDto) {
    return await this.addressbookService.getClientAdress(options);
  }

  @Get(':id')
=======

  @Post('clients/:id')
>>>>>>> 7eda320dbc7a67787b9834b61a1e7d1704b605c8
  async getAddressById(@Param('id') clientID: number) {
    if (!clientID) {
      throw new BadRequestException('Client ID is required');
    }

    return await this.addressbookService.getAddressById(clientID);
  }

  @Put('update/:id')
  async updateAddressBook(
    @Param('id') id: number,
    @Body() changes: UpdateAddressDto,
  ) {
    const addressBook = await this.addressbookService.getAddressById(id);

    if (!addressBook) {
      throw new BadRequestException('Client ID mismatch.');
    }

    await this.addressbookService.updateAddressBook(id, changes);

    return await this.addressbookService.getAddressById(id);
  }

  @Post('create')
  async CreateAddressBook(@Body() clientAddress: NewClientAddressDto) {
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
<<<<<<< HEAD
    const fakeAddress = {
      clientId: faker.random.number(),
      fullName: faker.name.findName(),
      mobileNo: faker.phone.phoneNumberFormat(),
=======
    var fakeAddress = {
      client_id: faker.random.number(),
      full_name: faker.name.findName(),
      mobile_no: faker.phone.phoneNumberFormat(),
>>>>>>> 7eda320dbc7a67787b9834b61a1e7d1704b605c8
      address: faker.address.streetAddress(),
      barangay: faker.address.streetName(),
      city: faker.address.city(),
      province: faker.address.state(),
<<<<<<< HEAD
      lastTransactionDate: faker.date.recent(),
      lastDateUpdated: faker.date.recent(-1),
      dateCreated: faker.date.recent(-1),
=======
      last_transaction_date: faker.date.recent(),
      last_date_updated: faker.date.recent(-1),
      date_created: faker.date.recent(-1),
>>>>>>> 7eda320dbc7a67787b9834b61a1e7d1704b605c8
    };

    return await this.addressbookService.createAddressBook(fakeAddress);
  }
}

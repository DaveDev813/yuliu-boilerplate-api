import { Controller, Param, Post, UseGuards, Body, Put, Get, Req, Res, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ClientAccountService } from './services/clientAccount.service';
import { NewClientDto, UpdateClientDto } from './dto/client.dto';
import { searchDto } from 'src/_commons/commons.dto';
import { Request, Response } from 'express';
import { RegisterClientAccount } from './dto/clientAccount.dto';
import { ClientSignIn } from './dto/SignInClient.dto';

@ApiUseTags('Client')
// @ApiBearerAuth()
// @UseGuards(AuthGuard())
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientAccountService: ClientAccountService) {}

  @Post()
  async getClients(@Body() options: searchDto){

    // return await this.clientAccountService.getClients(options);
  }

  @Post('signin')
  async signInClient(@Body() credentials: ClientSignIn, @Req() req: Request, @Res() res: Response){

    const account = await this.clientAccountService.authenticateClientAccount(credentials.email, credentials.password);

    if (!account) {

       throw new UnauthorizedException('Invalid email and password combination.');

    } else {

      const info = await this.clientAccountService.getClientInforByAccountId(account.id);

      if (!info) {

        throw new NotFoundException('Customer information can\'t be found');

      } else {

        req.session.type = 'customer';
        req.session.isLoggedIn = true;
        req.session.name = `${info.firstname} ${info.lastname}`;
        req.session.mobileNo = info.mobileNo;
        req.session.email = info.email;

        res.status(200).send({ status : 'OK', message : 'Success' });
      }
    }
  }

  @Post('signout')
  async signOutClient(@Body() credentials: any, @Req() req: Request, @Res() res: Response){

    req.session.destroy( err => {

        if (err) { throw new BadRequestException('Unexpected error occured..'); }

        res.status(200).send({ status : 'OK', message : 'Success' });

    });
  }

  @Post('register')
  async registerClient(@Body() account: RegisterClientAccount){

    const duplicate = await this.clientAccountService.checkDuplicateEmail(account.email);

    if (duplicate) {

      throw new BadRequestException('Email already exists..');

    } else {

      const result = this.clientAccountService.registerNewClient(account.email, account.password);

      return result;

    }
  }

  @Put('info/update')
  async updateClientInfo(@Body() revisions: UpdateClientDto){
  }

  // @Get(':id')
  // async getClientInfo(@Param('id') identity: number) {
  //   const client = this.clientService.getClientInfoById(identity);

  //   if (!client) {
  //     return {
  //       error: { description: 'No Client Found' },
  //     };
  //   }

  //   return client;
  // }

  // @Post('create')
  // async createClient(@Body() client: NewClientDto) {

  //   const newClient = await this.clientService.createClient(client);

  //   return {
  //     data: { clientId: newClient.raw.insertId },
  //   };
  // }

  // @Put('update/:id')
  // async updateClient(
  //   @Param('id') id: number,
  //   @Body() revisions: UpdateClientDto,
  // ) {
  //   const client = this.clientService.getClientInfoById(id);

  //   if (!client) {
  //     return {
  //       error: { description: 'No Client Found' },
  //     };
  //   }

  //   await this.clientService.updateClient(id, revisions);

  //   return await this.clientService.getClientInfoById(id);
  // }



}

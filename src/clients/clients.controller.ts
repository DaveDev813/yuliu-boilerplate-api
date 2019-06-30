import { Controller, Param, Post, UseGuards, Body, Put, Get, Req, Res, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ClientAccountService } from './services/clientAccount.service';
import { NewClientDto, UpdateClientDto } from './dto/client.dto';
import { searchDto } from 'src/_commons/commons.dto';
import { Request, Response } from 'express';
import { RegisterClientAccount } from './dto/clientAccount.dto';
import { ClientSignIn } from './dto/SignInClient.dto';
import { SessGuard } from '../_guards/session.guard';
import { CustomerProductService } from './services/customerProduct.service';

@ApiUseTags('Client')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('client')
export class ClientsController {

  constructor(
    private readonly clientAccountService: ClientAccountService,
    private readonly productService: CustomerProductService,
  ) {}

  @Post('register')
  async registerClient(@Body() account: RegisterClientAccount, @Res() res: Response){

    const duplicate = await this.clientAccountService.checkDuplicateEmail(account.email);

    if (duplicate) {

      throw new BadRequestException('Email already exists..');

    } else {

      const result = await this.clientAccountService.registerNewClient(account);

      res.status(200).send({ status : "ok", payload : result });
    }
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

        req.session.accountId = info.account_id;
        req.session.isLoggedIn = true;
        req.session.name = `${info.firstname} ${info.lastname}`;
        req.session.mobileNo = info.mobileNo;
        req.session.email = info.email;
        req.session.type = 'customer';

        res.status(200).send({ status : 'OK', message : 'Success' });
      }
    }
  }

  @Post('signout')
  @UseGuards(new SessGuard())
  async signOutClient(@Body() credentials: any, @Req() req: Request, @Res() res: Response){

    req.session.destroy( err => {

        if (err) { throw new BadRequestException('Unexpected error occured..'); }

        res.status(200).send({ status : 'OK', message : 'Success' });
    });
  }

  @Get('info')
  @UseGuards(new SessGuard())
  async getClientInfo(@Req() req : Request, @Res() res : Response){

    const info = await this.clientAccountService.getClientInforByAccountId(req.session.accountId);

    res.status(200).send({ status : "ok", payload : info });
  }

  @Get('services/')
  // @UseGuards(new SessGuard())
  async getCuratedServices(@Req() req: Request, @Res() res: Response){

    const services = await this.productService.getCustomerServices();

    res.status(200).send({ status : "ok", payload : services});
  }

  @Get('services/categories')
  // @UseGuards(new SessGuard())
  async getProductCategories(@Req() req: Request, @Res() res: Response){

    const categories = await this.productService.getCustomerServiceCategories();

    res.status(200).send({ status : "ok", payload : categories });
  }

}
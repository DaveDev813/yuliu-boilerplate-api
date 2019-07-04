import { Controller, Param, Post, UseGuards, Body, Get, Req, Res, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ClientAccountService } from './services/clientAccount.service';
import { Request, Response } from 'express';
import { RegisterClientAccount } from './dto/clientAccount.dto';
import { ClientSignIn } from './dto/SignInClient.dto';
import { SessGuard } from '../_guards/session.guard';
import { CustomerProductService } from './services/customerProduct.service';
import { CommonServices } from 'src/_commons/commons.service';

@ApiUseTags('Client')
@ApiBearerAuth()
@Controller('client')
export class ClientsController {

  constructor(
    private readonly commons: CommonServices,
    private readonly clientAccountService: ClientAccountService,
    private readonly productService: CustomerProductService,
  ) {}

  @Get('verify/:id/:guid')
  async verifyEmail(@Res() res: Response, @Param('id') id: number, @Param('guid') tracker:string){

    const info = await this.clientAccountService.getAccountByVerificationToken(id, tracker);

    if(info){

      if(info.isVerified){

        res.status(400).send({ status: "failed", message : 'account is alredy verified', payload : info });

      }else{

        const result = await this.clientAccountService.verifyAccount(id);

        if(result){

          res.status(200).send({ status: "ok", message : 'account has been verified.', payload : info });

        }else{

          res.status(400).send({ status: "failed", message : 'unexpected error occured.', payload : result });
        }
      }

    }else{

      res.status(400).send({ status: "failed", message : 'could not find account.', payload : info });

    }

  }

  @Post('register')
  @UseGuards(AuthGuard())
  async registerClient(@Body() account: RegisterClientAccount, @Res() res: Response){

    const duplicate = await this.clientAccountService.checkDuplicateEmail(account.email);

    if (duplicate) {

      throw new BadRequestException('Email already exists..');

    } else {

      const result = await this.clientAccountService.registerNewClient(account);

      if(result){

        const emailSent = this.commons.sendVerificationEmail(result.email, result.id, result.name, result.verificationToken);

        if(emailSent){

          res.status(200).send({ status : "ok", payload : result });

        }else{

          throw new BadRequestException('Unexpected error occured, please try again later..');
        }

      }else{

        throw new BadRequestException('Unexpected error occured, please try again later..');
      }

    }

  }

  @Post('signin')
  @UseGuards(AuthGuard())
  async signInClient(@Body() credentials: ClientSignIn, @Req() req: Request, @Res() res: Response){

    const account = await this.clientAccountService.authenticateClientAccount(credentials.email, credentials.password);

    if (!account) {

       throw new UnauthorizedException('Invalid email and password combination.');

    } else {

      const info = await this.clientAccountService.getClientInfoByAccountId(account.id);

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
  @UseGuards(AuthGuard(), new SessGuard())
  async signOutClient(@Req() req: Request, @Res() res: Response){

    req.session.destroy( err => {

        if (err) { throw new BadRequestException('Unexpected error occured..'); }

        res.status(200).send({ status : 'OK', message : 'Success' });
    });
  }

  @Get('info')
  @UseGuards(AuthGuard(), new SessGuard())
  async getClientInfo(@Req() req : Request, @Res() res : Response){

    const info = await this.clientAccountService.getClientInfoByAccountId(req.session.accountId);

    res.status(200).send({ status : "ok", payload : info });
  }

  @Get('services/')
  // @UseGuards(AuthGuard(), new SessGuard())
  async getCuratedServices(@Req() req: Request, @Res() res: Response){

    const services = await this.productService.getCustomerServices();

    res.status(200).send({ status : "ok", payload : services});
  }

  @Get('services/categories')
  // @UseGuards(AuthGuard(), new SessGuard())
  async getProductCategories(@Req() req: Request, @Res() res: Response){

    const categories = await this.productService.getCustomerServiceCategories();

    res.status(200).send({ status : "ok", payload : categories });
  }

}
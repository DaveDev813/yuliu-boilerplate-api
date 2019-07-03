import {
  Controller,
  Post,
  Body,
  NotAcceptableException,
  Get,
  Req,
  Res,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { newUserDto } from './dto/users.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { SessGuard } from 'src/_guards/session.guard';
import * as moment from 'moment';

@ApiUseTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(new SessGuard())
  async checksession(@Req() req: Request) {

    return req.session;
  }

  @Post('signout')
  @UseGuards(new SessGuard())
  async signOut(@Req() req: Request, @Res() res: Response) {

    req.session.destroy( err => {

      if (err) { throw new BadRequestException('an unknown error occurred'); }

      res.send({
        status : 'ok',
        message : 'successfully logged out a user',
      });

    });
  }

  @Post('signin')
  async signIn(@Body() cred: any, @Req() req: Request, @Res() res: Response) {

    req.session.name = 'John Doe';
    req.session.isLoggedIn = true;

    res.send({
      status : 'ok',
      message : 'successfully logged in a user',
    });
  }

  @Post('signup')
  async registerUser(@Body() user: newUserDto) {
    if (moment(user.app_token_validity).isValid() && moment(user.api_key_validity).isValid()) {
      return await this.userService.registerUser(user);
    } else {
      throw new NotAcceptableException('Invalid validity dates, please check App/API validity dates.');
    }
  }
}

import {
  Controller,
  Post,
  Body,
  NotAcceptableException,
  Get,
} from '@nestjs/common';
import { newUserDto } from './dto/users.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import * as moment from 'moment';

@ApiUseTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  async registerUser(@Body() user: newUserDto) {
    if (
      moment(user.app_token_validity).isValid() &&
      moment(user.api_key_validity).isValid()
    ) {
      return await this.userService.registerUser(user);
    } else {
      throw new NotAcceptableException(
        'Invalid validity dates, please check App/API validity dates.',
      );
    }
  }
}

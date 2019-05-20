import { Controller, Post, Param, Body } from '@nestjs/common';
import { signInDto } from './dto/signIn.dto';
import { ApiUseTags } from '@nestjs/swagger';
import * as uniqid from 'uniqid';


@ApiUseTags('User')
@Controller('users')
export class UsersController{

    @Post('signin')
    signIn(
        @Body() appCredentials : signInDto
    ){
        return `${uniqid()}-${uniqid()}-${uniqid()}`;
    }
}

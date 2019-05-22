import { Controller, Post, Param, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { signInDto, newUserDto } from './dto/users.dto';
import { ApiUseTags } from '@nestjs/swagger';
import * as uniqid from 'uniqid';
import { UsersService } from './users.service';

@ApiUseTags('User')
@Controller('users')
export class UsersController{

    constructor(
        private readonly userService : UsersService
    ){

    }

    @Post('signin')
    async signInUser(@Body() creds : signInDto){

        let user = await this.userService.getUser(creds)

        if(user){ 

            return await this.userService.signInUser(user.id.toString()); 
        }

        throw new HttpException('Authentication Failed', HttpStatus.PRECONDITION_FAILED);
    }

    @Post('signup')
    async registerUser(@Body() user : newUserDto){

        return await this.userService.registerUser(user);
    }

    @Post('disable/:id')
    disableUser(@Param('id') id : string, @Body() revisions : any){

    }
}

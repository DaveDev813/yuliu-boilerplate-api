import { Controller, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { signInDto, newUserDto } from './dto/users.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiUseTags('User')
@Controller('users')
export class UsersController{

    constructor(
        private readonly userService : UsersService
    ){}

    @Post('signup')
    async registerUser(@Body() user : newUserDto){

        return await this.userService.registerUser(user);
    }
}

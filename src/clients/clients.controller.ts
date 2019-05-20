import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Client')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('clients')
export class ClientsController{

    @Get(':id')
    getClientInfo(@Param('id') id : string){

    }

    @Get()
    getClients(@Query() query : string){

    }

    @Post('register')
    createClient(){

    }

    @Post('update/:id')
    updateClient(){

    }

}

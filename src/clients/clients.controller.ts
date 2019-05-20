import { Controller, Get, Param, Post, Query, UseGuards, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ClientsService } from './clients.service';
import { newClientDto } from './dto/newClient.dto';

@ApiUseTags('Client')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('clients')
export class ClientsController{

    constructor(
        private readonly clientService : ClientsService
    ){

    }

    @Get(':id')
    getClientInfo(@Param('id') id : string){

    }

    @Get()
    getClients(@Query() query : string){
        return this.clientService.getAllClient();
    }

    @Post('register')
    async createClient(@Body() client : newClientDto){

        let result = await this.clientService.createClient(client);

        return result.generatedMaps;
    }

    @Post('update/:id')
    updateClient(){

    }

}

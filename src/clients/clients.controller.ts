import { Controller, Get, Param, Post, Query, UseGuards, Body, Options } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiModelProperty } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ClientsService } from './clients.service';
import { newClientDto, updateClientDto, searchClientDto } from './dto/client.dto';

@ApiUseTags('Client')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('clients')
export class ClientsController{

    constructor(private readonly clientService : ClientsService){}

    @Post()
    getClients(@Body() options : searchClientDto){

        return this.clientService.getClients(options);
    }

    @Post(':id')
    getClientInfo(@Body('id') id : string){

        return this.clientService.getClientInfoById(id);
    }

    @Post('create')
    async createClient(@Body() client : newClientDto){

        return await this.clientService.createClient(client);
    }

    @Post('update/:id')
    async updateClient(@Param('id') id : string, @Body() revisions : updateClientDto){

        return await this.clientService.updateClient(id, revisions);
    }

    // @Post('disable/:id')
    // async disableClient(@Param('id') id : string){

    //     return await this.clientService.disableClient(id);
    // }
}

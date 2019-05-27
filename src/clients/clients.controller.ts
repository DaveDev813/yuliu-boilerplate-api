import { Controller, Param, Post, UseGuards, Body, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ClientsService } from './clients.service';
import { newClientDto, updateClientDto } from './dto/client.dto';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';

@ApiUseTags('Client')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('clients')
export class ClientsController{

    constructor(private readonly clientService : ClientsService){}

    @Post()
    async getClients(@Body() options : searchDto){

        return await this.clientService.getClients(options);
    }

    @Post(':id')
    async getClientInfo(@Body('id') identity : primaryIdDto){

        return await this.clientService.getClientInfoById(identity);
    }

    @Post('create')
    async createClient(@Body() client : newClientDto){

        return await this.clientService.createClient(client);
    }

    @Put('update/:id')
    async updateClient(@Param('id') id : string, @Body() revisions : updateClientDto){

        return await this.clientService.updateClient(id, revisions);
    }
}

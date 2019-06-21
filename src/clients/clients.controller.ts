import {
  Controller,
  Param,
  Post,
  UseGuards,
  Body,
  Put,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ClientsService } from './services/clients.service';
import { NewClientDto, UpdateClientDto } from './dto/client.dto';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';

@ApiUseTags('Client')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @Post()
  async getClients(@Body() options: searchDto) {
    return await this.clientService.getClients(options);
  }

  @Get(':id')
  async getClientInfo(@Param('id') identity: number) {
    const client = this.clientService.getClientInfoById(identity);

    if (!client) {
      return {
        error: { description: 'No Client Found' },
      };
    }

    return client;
  }

  @Post('create')
  async createClient(@Body() client: NewClientDto) {
    const newClient = await this.clientService.createClient(client);

    return {
      data: { clientId: newClient.raw.insertId },
    };
  }

  @Put('update/:id')
  async updateClient(
    @Param('id') id: number,
    @Body() revisions: UpdateClientDto,
  ) {
    const client = this.clientService.getClientInfoById(id);

    if (!client) {
      return {
        error: { description: 'No Client Found' },
      };
    }

    await this.clientService.updateClient(id, revisions);

    return await this.clientService.getClientInfoById(id);
  }
}

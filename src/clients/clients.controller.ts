import {
  Controller,
  Param,
  Post,
  UseGuards,
  Body,
  Put,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ClientsService } from './clients.service';
import { NewClientDto, UpdateClientDto } from './dto/client.dto';
import { searchDto, primaryIdDto } from 'src/_commons/commons.dto';

@ApiUseTags('Client')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @Get()
  async getClients(@Body() options: searchDto) {
    return await this.clientService.getClients(options);
  }

  @Get(':id')
  async getClientInfo(@Param('id') identity: number) {
    return await this.clientService.getClientInfoById(identity);
  }

  @Post('create')
  async createClient(@Body() client: NewClientDto) {
    return await this.clientService.createClient(client);
  }

  @Put('update/:id')
  async updateClient(
    @Param('id') id: string,
    @Body() revisions: UpdateClientDto,
  ) {
    return await this.clientService.updateClient(id, revisions);
  }
}

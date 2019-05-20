import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { clientProviders } from './client.providers';
import { DatabaseModule } from 'src/_database/database.module';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'bearer' })
    ],
    controllers : [ ClientsController ],
    providers : [ ...clientProviders, ClientsService, UsersService, AuthService]
})
export class ClientsModule {}

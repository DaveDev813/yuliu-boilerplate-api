import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { clientProviders } from './clients.providers';
import { DatabaseModule } from 'src/_database/database.module';
import { userProviders } from 'src/users/users.providers';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'bearer' })
    ],
    controllers : [ 
        ClientsController 
    ],
    providers : [ 
        ...clientProviders, 
        ...userProviders, 
        ClientsService, 
        UsersService, 
        AuthService
    ]
})
export class ClientsModule {}

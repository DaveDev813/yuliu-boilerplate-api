import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'bearer' })
    ],
    controllers : [ ClientsController ],
    providers : [ ClientsService, UsersService, AuthService]
})
export class ClientsModule {}

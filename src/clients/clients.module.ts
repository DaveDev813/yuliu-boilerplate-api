import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './services/clients.service';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { clientProviders, addressBookProviders } from './clients.providers';
import { DatabaseModule } from 'src/_database/database.module';
import { userProviders } from 'src/users/users.providers';
import { JWTChecker, Logger } from 'src/app.middleware';
import { CommonQueries } from 'src/_commons/commons.orm';
import { AddressbookController } from './addressbook.controller';
import { AddressbookService } from './services/addressbook.service';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'bearer' })
    ],
    controllers : [ 
        ClientsController, AddressbookController
    ],
    providers : [ 
        CommonQueries,
        ...userProviders,
        ...clientProviders, 
        ...addressBookProviders,
        ClientsService, 
        UsersService,
        AddressbookService
    ]
})
export class ClientsModule implements NestModule{

    /**
     * Apply middlewares for this module
     */
    configure(consumer : MiddlewareConsumer){

        consumer.apply(JWTChecker).forRoutes('clients');
    }
}

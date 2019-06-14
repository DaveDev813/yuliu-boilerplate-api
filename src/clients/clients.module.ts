import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { clientProviders } from './clients.providers';
import { DatabaseModule } from 'src/_database/database.module';
import { userProviders } from 'src/users/users.providers';
import { JWTChecker, Logger } from 'src/app.middleware';
import { CommonQueries } from 'src/_commons/commons.orm';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'bearer' })
    ],
    controllers : [ 
        ClientsController 
    ],
    providers : [ 
        CommonQueries,
        ...clientProviders, 
        ClientsService, 
        ...userProviders,
        UsersService
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

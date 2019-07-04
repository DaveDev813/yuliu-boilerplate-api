import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientAccountService } from './services/clientAccount.service';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { clientProviders, addressBookProviders, clientAccountProviders } from './clients.providers';
import { DatabaseModule } from 'src/_database/database.module';
import { userProviders } from 'src/users/users.providers';
import { JWTChecker, Logger } from 'src/app.middleware';
import { CommonQueries } from 'src/_commons/commons.orm';
import { AddressbookController } from './addressbook.controller';
import { AddressbookService } from './services/addressbook.service';
import { vendorProviders, productProviders } from '../vendors/vendors.provider';
import { VendorsService } from '../vendors/services/vendors.service';
import { CustomerProductService } from './services/customerProduct.service';
import { CommonServices } from 'src/_commons/commons.service';

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
        ...vendorProviders,
        ...userProviders,
        ...clientProviders,
        ...vendorProviders,
        ...productProviders,
        ...clientAccountProviders,
        ...addressBookProviders,
        ClientAccountService,
        UsersService,
        AddressbookService,
        CommonServices,
        CustomerProductService,
    ]
})
//export class ClientsModule {}
export class ClientsModule implements NestModule {
  /**
   * Apply middlewares for this module
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTChecker).forRoutes('client');
  }
}

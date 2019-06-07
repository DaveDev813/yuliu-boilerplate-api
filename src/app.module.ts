import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from './http.strategy';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from './_config/config.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { userProviders } from './users/users.providers';
import { VendorsModule } from './vendors/vendors.module';
import { Logger } from './app.middleware';
import { CommonQueries } from './_commons/commons.orm';
import { VendorServiceController } from './vendors/vendor-service.controller';
import { VendorServiceService } from './vendor-service/vendor-service.service';
import { AddressbookService } from './clients/services/addressbook.service';
import { AddressbookController } from './clients/addressbook.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
    ClientsModule,
    ConfigModule,
    UsersModule,
    VendorsModule
  ],
  providers: [
    CommonQueries,
    ...userProviders,
    UsersService,
    HttpStrategy,
    VendorServiceService,
    AddressbookService,
  ]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(Logger).forRoutes({ path : "*", method : RequestMethod.ALL });
  }
}

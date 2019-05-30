import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from './http.strategy';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule } from './_config/config.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { userProviders } from './users/users.providers';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { productProviders } from './products/products.provider';
import { VendorsService } from './vendors/vendors.service';
import { VendorsModule } from './vendors/vendors.module';
import { vendorProviders } from './vendors/vendors.provider';
import { Logger } from './app.middleware';
import { CommonQueries } from './_commons/crud.orm';
import { VendorUsersController } from './vendor-users/vendor-users.controller';
import { VendorUsersModule } from './vendor-users/vendor-users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
    ClientsModule,
    ConfigModule,
    UsersModule,
    ProductsModule,
    VendorsModule,
    VendorUsersModule
  ],
  providers: [
    CommonQueries,
    ...userProviders,
    UsersService,
    ...vendorProviders,
    VendorsService, 
    ...productProviders,
    ProductsService,
    HttpStrategy,
  ],
  controllers: [VendorUsersController],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(Logger).forRoutes({ path : "*", method : RequestMethod.ALL });
  }
}

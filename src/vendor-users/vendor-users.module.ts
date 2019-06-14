import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JWTChecker } from 'src/app.middleware';
import { DatabaseModule } from 'src/_database/database.module';
import { PassportModule } from '@nestjs/passport';
import { productProviders } from 'src/products/products.provider';
import { ProductsService } from 'src/products/products.service';
import { userProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';
import { CommonQueries } from 'src/_commons/crud.orm';
import { VendorUsersController } from './vendor-users.controller';
import { VendorUsersService } from './vendor-users.service';
import { vendorUsersProviders } from './vendor-users.provider';
import { vendorProviders } from 'src/vendors/vendors.provider';
import { VendorsService } from 'src/vendors/vendors.service';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ],
  controllers: [VendorUsersController],
  providers: [
    CommonQueries,
    ...productProviders,
    ProductsService,
    ...userProviders,
    UsersService,
    ...vendorProviders,
    VendorsService,
    ...vendorUsersProviders,
    VendorUsersService,
  ],
})
export class VendorUsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JWTChecker).forRoutes('vendors');
  }
}

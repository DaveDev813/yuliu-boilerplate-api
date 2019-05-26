import { Module } from '@nestjs/common';
import { VendorsController } from './vendors/vendors.controller';
import { TransactionsController } from './transactions/transactions.controller';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from './http.strategy';
import { ClientsModule }  from './clients/clients.module';
import { ConfigModule }   from './config/config.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { userProviders } from './users/users.providers';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { productProviders } from './products/products.provider';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
    ClientsModule,
    ConfigModule,
    UsersModule,
    ProductsModule
  ],
  controllers: [],
  providers: [
    ...userProviders,
    ...productProviders,
    UsersService,
    ProductsService,
    HttpStrategy, 
  ],

})

export class AppModule {}

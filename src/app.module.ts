import { Module } from '@nestjs/common';
import { VendorsController } from './vendors/vendors.controller';
import { TransactionsController } from './transactions/transactions.controller';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { HttpStrategy } from './http.strategy';
import { ClientsModule }  from './clients/clients.module';
import { ConfigModule }   from './config/config.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
    ClientsModule,
    ConfigModule,
    UsersModule
  ],
  controllers: [
    VendorsController, 
    TransactionsController
  ],
  providers: [
    UsersService,
    AuthService, 
    HttpStrategy
  ],
})

export class AppModule {}

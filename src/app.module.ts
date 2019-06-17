import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
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

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
    ClientsModule,
    ConfigModule,
    UsersModule,
    VendorsModule,
  ],
  providers: [
    CommonQueries,
    ...userProviders,
    UsersService,
    HttpStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

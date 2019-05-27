import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JWTChecker } from 'src/app.middleware';
import { VendorsController } from './vendors.controller';
import { DatabaseModule } from 'src/_database/database.module';
import { PassportModule } from '@nestjs/passport';
import { productProviders } from 'src/products/products.provider';
import { ProductsService } from 'src/products/products.service';
import { userProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';
import { vendorProviders } from './vendors.provider';
import { VendorsService } from './vendors.service';
import { CommonQueries } from 'src/_commons/crud.orm';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'bearer' })
    ],
    controllers : [ 
        VendorsController
    ],
    providers : [
        CommonQueries,
        ...productProviders,
        ProductsService,
        ...userProviders,
        UsersService,
        ...vendorProviders,
        VendorsService,
    ]
})
export class VendorsModule implements NestModule{
    configure(consumer : MiddlewareConsumer){
        consumer.apply(JWTChecker).forRoutes('vendors')
    }
}

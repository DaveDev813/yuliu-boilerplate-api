import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/_database/database.module';
import { PassportModule } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { productProviders } from './products.provider';
import { UsersService } from 'src/users/users.service';
import { userProviders } from 'src/users/users.providers';
import { JWTChecker } from 'src/app.middleware';
import { CommonQueries } from 'src/_commons/crud.orm';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'bearer' })
    ],
    controllers : [ 
        ProductsController
    ],
    providers : [
        CommonQueries,
        ...productProviders,
        ProductsService,
        ...userProviders, 
        UsersService
    ]
})

export class ProductsModule implements NestModule{
    configure(consumer : MiddlewareConsumer){
        consumer.apply(JWTChecker).forRoutes('products')
    }
}

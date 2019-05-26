import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/_database/database.module';
import { PassportModule } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { AuthService } from 'src/auth/auth.service';
import { productProviders } from './products.provider';
import { UsersService } from 'src/users/users.service';
import { userProviders } from 'src/users/users.providers';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'bearer' })
    ],
    controllers : [ 
        ProductsController
    ],
    providers : [
        ...productProviders,
        ProductsService,
        ...userProviders, 
        UsersService,
        AuthService
    ]
})

export class ProductsModule {}

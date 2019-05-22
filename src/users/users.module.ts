import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/_database/database.module';
import { PassportModule } from '@nestjs/passport';
import { userProviders } from './users.providers';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'bearer' })
    ],
    controllers : [
        UsersController
    ],
    providers : [ 
        ...userProviders, 
        UsersService
    ]
})

export class UsersModule {}
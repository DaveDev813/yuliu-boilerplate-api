import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JWTChecker } from 'src/app.middleware';
import { VendorsController } from './vendors.controller';
import { DatabaseModule } from 'src/_database/database.module';
import { PassportModule } from '@nestjs/passport';
import { userProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';
import { VendorsService } from './services/vendors.service';
import { CommonQueries } from 'src/_commons/commons.orm';
import { vendorProviders, branchProviders, employeeProviders, servicesProviders } from './vendors.provider';
import { BranchesController } from './branches.controller';
import { BranchesService } from './services/branches.service';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'bearer' })
    ],
    controllers : [ 
        VendorsController, BranchesController
    ],
    providers : [
        ...userProviders,
        ...vendorProviders,
        ...branchProviders,
        ...employeeProviders,
        ...servicesProviders,
        CommonQueries,
        UsersService,
        BranchesService,
        VendorsService,
    ]
})
export class VendorsModule{}
// export class VendorsModule implements NestModule{
//     configure(consumer : MiddlewareConsumer){
//         consumer.apply(JWTChecker).forRoutes('vendors')
//     }
// }

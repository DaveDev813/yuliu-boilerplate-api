import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JWTChecker } from 'src/app.middleware';
import { VendorsController } from './vendors.controller';
import { DatabaseModule } from 'src/_database/database.module';
import { PassportModule } from '@nestjs/passport';
import { userProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';
import { VendorsService } from './services/vendors.service';
import { CommonQueries } from 'src/_commons/commons.orm';
import {
  vendorProviders,
  branchProviders,
  employeeProviders,
  productProviders,
} from './vendors.provider';
import { BranchesController } from './branches.controller';
import { BranchesService } from './services/branches.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './services/products.service';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ],
  controllers: [
    VendorsController,
    BranchesController,
    ProductsController,
    EmployeeController,
  ],
  providers: [
    CommonQueries,
    ...userProviders,
    UsersService,
    ...vendorProviders,
    VendorsService,
    ...branchProviders,
    BranchesService,
    ...productProviders,
    ProductsService,
    EmployeeService,
    ...employeeProviders,
  ],
})
export class VendorsModule {}
// export class VendorsModule implements NestModule{
//     configure(consumer : MiddlewareConsumer){
//         consumer.apply(JWTChecker).forRoutes('vendors')
//     }
// }

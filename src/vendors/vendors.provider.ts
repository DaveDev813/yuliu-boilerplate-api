import { Connection} from 'typeorm';
import { Vendors, VendorBranches, VendorEmployees, VendorProducts } from './entities/vendors.entity';

export const vendorProviders = [{
    provide: 'VENDOR_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Vendors),
    inject: ['DATABASE_CONNECTION'],
}];

export const branchProviders = [{
    provide: 'VENDOR_BRANCH_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(VendorBranches),
    inject: ['DATABASE_CONNECTION'],
}];

export const productProviders = [{
    provide: 'VENDOR_PRODUCT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(VendorProducts),
    inject: ['DATABASE_CONNECTION'],
}];

export const employeeProviders = [{
    provide: 'VENDOR_EMPLOYEE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(VendorEmployees),
    inject: ['DATABASE_CONNECTION'],
}];

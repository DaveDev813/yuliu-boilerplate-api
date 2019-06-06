import { Connection} from 'typeorm';
import { Vendors, Vendor_Branches, Vendor_Employee, Vendor_Services } from './entities/vendors.entity';

export const vendorProviders = [{
    provide: 'VENDOR_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Vendors),
    inject: ['DATABASE_CONNECTION'],
}];

export const branchProviders = [{
    provide: 'VENDOR_BRANCH_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Vendor_Branches),
    inject: ['DATABASE_CONNECTION'],
}];

export const employeeProviders = [{
    provide: 'VENDOR_EMPLOYEE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Vendor_Employee),
    inject: ['DATABASE_CONNECTION'],
}];

export const servicesProviders = [{
    provide: 'VENDOR_SERVICE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Vendor_Services),
    inject: ['DATABASE_CONNECTION'],
}];
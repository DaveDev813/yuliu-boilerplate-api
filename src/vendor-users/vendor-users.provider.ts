import { Connection} from 'typeorm';
import { VendorUsers } from './vendor-users.entity';

export const vendorUsersProviders = [{
    provide: 'VENDOR_USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(VendorUsers),
    inject: ['DATABASE_CONNECTION'],
}];
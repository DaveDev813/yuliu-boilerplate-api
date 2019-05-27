import { Connection} from 'typeorm';
import { Vendors } from './vendors.entity';

export const vendorProviders = [{
    provide: 'VENDOR_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Vendors),
    inject: ['DATABASE_CONNECTION'],
}];
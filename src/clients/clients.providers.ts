import { Connection} from 'typeorm';
import { Clients, Client_Address_Book } from './entities/clients.entity';

export const clientProviders = [{
    provide: 'CLIENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Clients),
    inject: ['DATABASE_CONNECTION'],
}];

export const addressBookProviders = [{
    provide: 'CLIENT_ADDRESS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Client_Address_Book),
    inject: ['DATABASE_CONNECTION']
}]
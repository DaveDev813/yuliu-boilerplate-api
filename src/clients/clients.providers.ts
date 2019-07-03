import { Connection} from 'typeorm';
import { Clients_Information } from './entities/clients.entity';
import { Client_Accounts } from './entities/clientAccounts.entity';
import { Client_Address_Book} from './entities/client-address-book.entity';

export const clientAccountProviders = [{
    provide: 'CLIENT_ACCOUNT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Client_Accounts),
    inject: ['DATABASE_CONNECTION'],
}];

export const clientProviders = [{
    provide: 'CLIENT_INFO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Clients_Information),
    inject: ['DATABASE_CONNECTION'],
}];

export const addressBookProviders = [{
    provide: 'CLIENT_ADDRESS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Client_Address_Book),
    inject: ['DATABASE_CONNECTION'],
}];
import { Connection} from 'typeorm';
import { Clients } from './clients.entity';

export const clientProviders = [{
    provide: 'CLIENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Clients),
    inject: ['DATABASE_CONNECTION'],
}];
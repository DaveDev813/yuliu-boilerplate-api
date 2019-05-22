import { Connection, Repository} from 'typeorm';
import { Users } from './users.entity';

export const userProviders = [{
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Users),
    inject: ['DATABASE_CONNECTION'],
}];
import { Connection} from 'typeorm';
import { Products } from './products.entity';

export const productProviders = [{
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Products),
    inject: ['DATABASE_CONNECTION'],
}];
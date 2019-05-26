import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'regasco',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging : false
    }),
  },
];
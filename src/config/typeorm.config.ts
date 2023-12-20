import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  ...(process.env.POSTGRES_SSL === 'true' && {
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
  logging:
    process.env.POSTGRES_LOGGING?.toLocaleLowerCase() === 'true' ?? false,
  entities: [`${__dirname}/../database/models/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
  seeds: [`${__dirname}/../database/seeds/*{.ts,.js}`],
  synchronize: false,
};

console.log('config', config);

// export default registerAs('database', () => config);
// export const connectionSource = new DataSource(config as DataSourceOptions);

export const database = registerAs('database', () => config);
export const dataSource = new DataSource(config as DataSourceOptions);
export default config;

import { Client } from 'pg';
import { getPgHost,getPgUser, getPgDatabase, getPgPassword, getPgPort} from '@common/utils/envConfig';

let client = new Client();

export const connection = async () => {
    client = new Client({
        host: getPgHost(),
        port: getPgPort(),
        user: getPgUser(),
        database: getPgDatabase(),
        password: getPgPassword(),
        ssl: true
    });
    await client.connect();
};

export const dbClient = () => client;
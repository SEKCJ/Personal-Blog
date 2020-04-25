import * as dotenv from 'dotenv';

dotenv.config();

export default {

    MySQL: {
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        user: process.env.DB_USER,
        database: process.env.DB_SCHEMA,
        multipleStatements: true
    },
    port: process.env.PORT,
}


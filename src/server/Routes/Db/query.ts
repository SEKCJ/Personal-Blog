import * as mysql from 'mysql';
import config from '../Config/connection';


const Connection = mysql.createConnection(config.MySQL);

export const Query = (query: string, values?: Array<string | number>) => {

    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(query, values, (err, results) => {
            if (err) return reject(err);

            return resolve(results);
        })
    })
}
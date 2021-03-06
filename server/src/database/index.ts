import mysql, {Pool} from 'mysql2/promise';
import mysqlBasic, {PoolOptions, Connection} from 'mysql2';
import fs from 'fs';

interface IConf {
    host: string;
    user: string;
    password: string;
    port: string;
    database: string;
}

// database settings
const data = fs.readFileSync(__dirname + '\\database.json', 'utf8');
const conf = JSON.parse(data) as PoolOptions;
const pool: Pool = mysql.createPool(conf);
const conn: Connection = mysqlBasic.createConnection(conf);
// exports //
export {conn, pool};

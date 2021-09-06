import fs from 'fs';
import mysql from 'mysql2/promise';
import mysqlBasic from 'mysql2';

// database settings
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(JSON.stringify(data));
const pool = mysql.createPool({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
});
const conn = mysqlBasic.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
});

// exports
export {conn, pool};

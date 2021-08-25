// database settings
const fs = require('fs'); // 파일 읽기 객체
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql'); // mysql
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
});
connection.connect();

module.exports = connection;

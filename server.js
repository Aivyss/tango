// express 및 포트
const express = require('express'); // express js
const app = express();
const port = process.env.PORT || 5000;

// database
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

// 파일전송 객체
const multer = require('multer'); // 파일 업로드 객체
const upload = multer({dest: './upload'});
app.use('/images', express.static('./upload')); // /images url을 ./upload로 매핑

// 서버 설정
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// 로그인 요청
app.post('/api/login', (req, res) => {
    console.log('USER_ID: ', req.body.STRING_ID);
    console.log('req.body= ', req.body);
    const sql = `SELECT 
                    * 
                FROM 
                    USER_TABLE
                WHERE
                    STRING_ID = ?`;
    const params = [req.body.STRING_ID];

    connection.query(sql, params, (err, rows, fields) => {
        console.log(rows);
        res.send(rows);
    });
});

// 회원가입 요청
app.post('/api/signup', (req, res) => {
    const sql = `INSERT INTO USER_TABLE (
        STRING_ID
        ,PASSWORD
    ) VALUES (
        ?
        ,?
    )`;
    const params = [];
    params.push(req.body.STRING_ID);
    params.push(req.body.PASSWORD);

    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    });
});

// 아이디 중복조회 요청
app.get('/api/checkDuplicated-id', (req, res) => {
    console.log('아이디 중복조회 요청');
    const sql = `SELECT ID FROM USER_TABLE WHERE STRING_ID = ?`;
    const params = [req.query.id];
    console.log('id= ', req.query.id);

    connection.query(sql, params, (err, rows, field) => {
        res.send(rows);
        console.log(err);
    });
});

app.get('/api/callAllDecks', (req, res) => {
    const params = [req.query.id];
    const sql = `SELECT * FROM DECK_TABLE WHERE USER_ID = ?`;
    console.log('전체덱 호출 id=', req.query.id);

    connection.query(sql, params, (err, rows, field) => {
        console.log('덱리스트: ', JSON.parse(JSON.stringify(rows)));
        res.send(JSON.parse(JSON.stringify(rows)));
    });
});

app.get('/api/checkDuplicated-deck-name', (req, res) => {
    const params = [req.query.name];
    const sql = `SELECT * FROM DECK_TABLE WHERE DECK_NAME = ?`;
    console.log('덱 이름 중복 확인=', req.query.name);

    connection.query(sql, params, (err, rows, field) => {
        res.send(rows);
    });
});

app.post('/api/create-deck', (req, res) => {
    const params = [req.body.deckName, req.body.userId];
    const sql = `INSERT INTO DECK_TABLE (DECK_NAME, USER_ID) VALUES (?, ?)`;
    console.log('덱이름 =', params);

    connection.query(sql, params, (err, rows, field) => {
        res.send(rows);
    });
});

app.listen(port, () => console.log('Listening on port = ', port));

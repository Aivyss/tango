const express = require('express');
const router = express.Router();
const conn = require('../database');

// 로그인 요청
router.post('/login', (req, res) => {
    console.log('USER_ID: ', req.body.STRING_ID);
    console.log('req.body= ', req.body);
    const sql = `SELECT 
                    * 
                FROM 
                    USER_TABLE
                WHERE
                    STRING_ID = ?`;
    const params = [req.body.STRING_ID];

    conn.query(sql, params, (err, rows, fields) => {
        console.log(rows);
        res.send(rows);
    });
});

// 회원가입 요청
router.post('/api/signup', (req, res) => {
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

    conn.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    });
});

// 아이디 중복조회 요청
router.get('/checkDuplicated-id', (req, res) => {
    console.log('아이디 중복조회 요청');
    const sql = `SELECT ID FROM USER_TABLE WHERE STRING_ID = ?`;
    const params = [req.query.id];
    console.log('id= ', req.query.id);

    connection.query(sql, params, (err, rows, field) => {
        res.send(rows);
        console.log(err);
    });
});

module.exports = router;

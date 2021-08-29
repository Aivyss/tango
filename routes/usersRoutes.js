const express = require('express');
const pbkdf2Password = require('pbkdf2-password');
const conn = require('../database');
const router = express.Router();
const hasher = pbkdf2Password();

// 로그인 요청
router.post('/login', (req, res) => {
    new Promise((resolve, reject) => {
        const sql = `SELECT 
                    * 
                FROM 
                    USER_TABLE
                WHERE
                    STRING_ID = ?`;
        const params = [req.body.STRING_ID];

        conn.query(sql, params, (err, rows, fields) => {
            resolve(rows);
        });
    })
        .then(data => {
            let userInfo = JSON.parse(JSON.stringify(data));
            if (userInfo.length) {
                [userInfo] = userInfo;
                const {PASSWORD, PW_SALT} = userInfo;
                const typedPw = req.body.PASSWORD;
                hasher({password: typedPw, salt: PW_SALT}, (err, pw, salt, hash) => {
                    if (err) throw err;
                    const flag = PASSWORD === hash; // 데이터베이스 === 유저가 친 암호화된 암호

                    if (flag) {
                        res.send({
                            ID: userInfo.ID,
                            STRING_ID: userInfo.STRING_ID,
                        });
                    } else {
                        res.send(false);
                    }
                });
            }
        })
        .catch(err => console.log(err));
});

// 회원가입 요청
router.post('/signup', (req, res) => {
    const {STRING_ID, PASSWORD} = req.body;

    new Promise((resolve, reject) => {
        hasher({password: PASSWORD}, (err, pw, salt, hash) => {
            if (err) throw err;

            resolve([hash, salt]);
        });
    })
        .then(data => {
            const sql = `INSERT INTO USER_TABLE (
                STRING_ID
                ,PASSWORD
                ,PW_SALT
            ) VALUES (
                ?
                ,?
                ,?
            )`;

            conn.query(sql, [STRING_ID, data[0], data[1]], (err, rows, fields) => {
                res.send(rows);
            });
        })
        .catch(err => console.log(err));
});

// 아이디 중복조회 요청
router.get('/checkDuplicated-id', (req, res) => {
    console.log('아이디 중복조회 요청');
    const sql = `SELECT ID FROM USER_TABLE WHERE STRING_ID = ?`;
    const params = [req.query.id];
    console.log('id= ', req.query.id);

    conn.query(sql, params, (err, rows, field) => {
        res.send(rows);
        console.log(err);
    });
});

module.exports = router;

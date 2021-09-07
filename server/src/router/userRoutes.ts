import express from 'express';
import {UserTable} from '../database/dbInterfaces';
import {Connection, Pool, PoolConnection, RowDataPacket, FieldPacket} from 'mysql2';
import {conn, pool} from '../database';

const pbkdf2Password = require('pbkdf2-password');
const router = express.Router();
const hasher = pbkdf2Password();

// * login process
router.post('/login', (req, res) => {
    new Promise<RowDataPacket[]>((resolve, reject) => {
        const sql = `SELECT 
                    * 
                FROM 
                    USER_TABLE
                WHERE
                    STRING_ID = ?`;
        const params = [req.body.STRING_ID];

        conn.query(sql, params, (err, rows, fields) => {
            resolve(rows as RowDataPacket[]);
        });
    })
        .then(data => {
            let userInfo = JSON.parse(JSON.stringify(data)) as UserTable[];
            if (userInfo.length) {
                const {PASSWORD, PW_SALT} = userInfo[0];
                const typedPw = req.body.PASSWORD;
                hasher({password: typedPw, salt: PW_SALT}, (err: any, pw: string, salt: string, hash: string) => {
                    if (err) throw err;
                    const flag = PASSWORD === hash; // 데이터베이스 === 유저가 친 암호화된 암호

                    if (flag) {
                        res.send({
                            ID: userInfo[0].ID,
                            STRING_ID: userInfo[0].STRING_ID,
                        });
                    } else {
                        res.send(false);
                    }
                });
            }
        })
        .catch(err => console.log(err));
});

// * signup process
router.post('/signup', (req, res) => {
    const {STRING_ID, PASSWORD} = req.body;

    new Promise<string[]>((resolve, reject) => {
        hasher({password: PASSWORD}, (err: any, pw: string, salt: string, hash: string) => {
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

// * check duplicate of user id
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

export default router;

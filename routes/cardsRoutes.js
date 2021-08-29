const express = require('express');
const router = express.Router();
const conn = require('../database');
const pool = require('../database2');

// 카드이름 중복조회
router.get('/checkDuplicateCardName', (req, res) => {
    const params = [req.query.userId, req.query.cardName];
    // params라는 속성은 deprecated...
    const sql = 'SELECT * FROM KIND_OF_CARD_TABLE WHERE USER_ID = ? AND CARD_NAME = ?';

    conn.query(sql, params, (err, rows, fields) => {
        console.log(rows);
        console.log('🚀 ~ file: server.js ~ line 133 ~ connection.query ~ rows', rows);
        res.send(JSON.parse(JSON.stringify(rows)));
    });
});

// 카드 카테고리 생성
router.post('/create-card-category', (req, res) => {
    (async () => {
        const connection = await pool.getConnection(async conn2 => conn2);

        try {
            await connection.beginTransaction();

            const paramOne = [req.body.cardName, req.body.userId];
            const paramTwo = req.body.backFields;
            const sqlOne = `INSERT INTO KIND_OF_CARD_TABLE
                (CARD_NAME, USER_ID)
            VALUES
                (?, ?)`;
            const sqlTwo = `INSERT INTO CARD_COL_TABLE
                (KIND_ID, COL_NAME)
            VALUES
                (?, ?)`;
            await connection.query(sqlOne, paramOne);

            const [rows] = await connection.query('SELECT LAST_INSERT_ID()');
            const kindTablePK = JSON.parse(JSON.stringify(rows))[0]['LAST_INSERT_ID()'];

            const testList = await Promise.all(
                paramTwo.map(async curr => {
                    await connection.query(sqlTwo, [kindTablePK, curr]);

                    return '됐쪄염';
                }),
            );
            console.log('🚀 ~ file: cardsRoutes.js ~ line 49 ~ testList', testList);

            await connection.commit();
            res.send(true);
        } catch (err) {
            console.log(err);
            await connection.rollback();
            res.send(false);
        } finally {
            connection.release();
        }
    })();

    // !deprecated, it makes bug sometimes
    // conn.beginTransaction(err => {
    //     if (err) {
    //         console.log(err);
    //         throw err;
    //     }
    //     const paramOne = [req.body.cardName, req.body.userId];
    //     const sqlOne = `INSERT INTO KIND_OF_CARD_TABLE
    //             (CARD_NAME, USER_ID)
    //         VALUES
    //             (?, ?)`;
    //     let kindTablePK;
    //     conn.query(sqlOne, paramOne, error => {
    //         if (error) {
    //             return conn.rollback(() => {
    //                 res.send(false);
    //                 throw error;
    //             });
    //         }
    //         conn.query('SELECT LAST_INSERT_ID()', (keySelectError, kindId, field) => {
    //             if (keySelectError) {
    //                 return conn.rollback(() => {
    //                     res.send(false);
    //                     throw keySelectError;
    //                 });
    //             }
    //             kindTablePK = JSON.parse(JSON.stringify(kindId))[0]['LAST_INSERT_ID()'];
    //             const sqlTwo = `INSERT INTO CARD_COL_TABLE
    //                         (KIND_ID, COL_NAME)
    //                     VALUES
    //                         (?, ?)`;
    //             const paramTwo = req.body.backFields;
    //             paramTwo.map((curr, index) =>
    //                 conn.query(sqlTwo, [kindTablePK, curr], backFieldsError => {
    //                     if (backFieldsError) {
    //                         return conn.rollback(() => {
    //                             res.send(false);
    //                             throw backFieldsError;
    //                         });
    //                     }
    //                     if (index === paramTwo.length - 1) {
    //                         conn.commit();
    //                         res.send(true);
    //                     }
    //                     return true;
    //                 }),
    //             );
    //             return true;
    //         });
    //         return true;
    //     });
    // });
});

// 카드 카테고리 전체조회
router.get('/call-all-card-categories', (req, res) => {
    const {userId} = req.query;
    const sql = `SELECT * FROM KIND_OF_CARD_TABLE WHERE USER_ID = ?`;
    conn.query(sql, [Number(userId)], (err, rows, fields) => {
        if (err) {
            console.log(err);
            throw err;
        } else {
            res.send(JSON.parse(JSON.stringify(rows)));
        }
    });
});

// 카드 컬럼 조회
router.get('/call-card-cols', (req, res) => {
    const {cardId} = req.query;
    console.log('🚀 ~ file: cardsRoutes.js ~ line 85 ~ router.get ~ cardId', cardId);
    const sql = 'SELECT * FROM CARD_COL_TABLE WHERE KIND_ID = ?';

    conn.query(sql, [cardId], (err, rows, fields) => {
        console.log('🚀 ~ file: cardsRoutes.js ~ line 89 ~ conn.query ~ rows', rows);
        if (err) {
            console.log('🚀 ~ file: cardsRoutes.js ~ line 89 ~ conn.query ~ err', err);
            throw err;
        } else {
            res.send(JSON.parse(JSON.stringify(rows)));
        }
    });
});

// 프론트 컬럼 중복조회
router.get('/check-duplicate-front', (req, res) => {
    const {cardId, deckId, str} = req.query;
    const sql = 'select * from CARD_FRONT_TABLE where KIND_ID = ? and DECK_ID = ? and FRONT_DATA =?';

    conn.query(sql, [Number(cardId), Number(deckId), str], (err, rows, fields) => {
        if (err) {
            console.log(err);
            throw err;
        } else {
            res.send(rows.length > 0);
        }
    });
});

// 카드 생성
router.post('/create-card', (req, res) => {
    const {deckId, cardId, front, colsValues} = req.body;

    (async () => {
        const connection = await pool.getConnection(async conn2 => conn2);

        try {
            // 프론트 인서트문
            const sqlOne = `insert into CARD_FRONT_TABLE (
                FRONT_DATA
                ,DECK_ID
                ,KIND_ID
            ) values(
                ?, ? ,?
            )`;
            // 프라이머리키 셀렉트
            const sqlTwo = `select LAST_INSERT_ID()`;
            // 백 인서트문
            const sqlThree = `insert into CARD_BACK_TABLE (
                FRONT_ID
                ,CARD_COL_ID
                ,BACK_DATA
            ) values (
                ?, ?, ?
            )`;
            await connection.query(sqlOne, [front, deckId, cardId]);
            let [rows] = await connection.query(sqlTwo);
            rows = JSON.parse(JSON.stringify(rows))[0]['LAST_INSERT_ID()'];
            Promise.all(
                Object.keys(colsValues).map(async prop => {
                    await connection.query(sqlThree, [rows, prop, colsValues[prop]]);
                }),
            );
            await connection.commit();
            res.send(true);
        } catch (err) {
            console.log(err);
            await connection.rollback();
            res.send(false);
        } finally {
            connection.release();
        }
    })();

    // !Bugs deprecated
    // conn.beginTransaction(err => {
    //     if (err) {
    //         console.log(err);
    //         res.send(false);
    //         throw err;
    //     } else {
    //         // 프론트 인서트문
    //         const sqlOne = `insert into CARD_FRONT_TABLE (
    //             FRONT_DATA
    //             ,DECK_ID
    //             ,KIND_ID
    //         ) values(
    //             ?, ? ,?
    //         )`;
    //         conn.query(sqlOne, [front, deckId, cardId], frontErr => {
    //             if (frontErr) {
    //                 return conn.rollback(() => {
    //                     res.send(false);
    //                     throw frontErr;
    //                 });
    //             }

    //             const sqlTwo = `select LAST_INSERT_ID()`;
    //             conn.query(sqlTwo, (keySelectErr, row) => {
    //                 if (keySelectErr) {
    //                     return conn.rollback(() => {
    //                         res.send(false);
    //                         throw keySelectErr;
    //                     });
    //                 }

    //                 const sqlThree = `insert into CARD_BACK_TABLE (
    //                     FRONT_ID
    //                     ,CARD_COL_ID
    //                     ,BACK_DATA
    //                 ) values (
    //                     ?, ?, ?
    //                 )`;
    //                 const frontKey = JSON.parse(JSON.stringify(row))[0]['LAST_INSERT_ID()'];
    //                 console.log('🚀 ~ file: cardsRoutes.js ~ line 146 ~ conn.query ~ frontKey', frontKey);

    //                 // 이건 뭐라 안하네
    //                 Object.keys(colsValues).map(prop => {
    //                     conn.query(sqlThree, [frontKey, Number(prop), colsValues[prop]], backErr => {
    //                         if (backErr) throw backErr;
    //                     });

    //                     return true;
    //                 });
    //                 res.send(true);
    //                 conn.commit();

    //                 return true;
    //             });

    //             return true;
    //         });

    //         return true;
    //     }
    // });
});

// 학습 업데이트
router.post('/update-cards-status', (req, res) => {
    console.log('백앤드로 넘어옴?');
    console.log(req.body);
    const {frontId, eFactor, repetition} = req.body;
    let {interval, dueDate} = req.body;
    interval *= 86400;
    console.log('🚀 ~ file: cardsRoutes.js ~ line 277 ~ router.post ~ interval', interval);
    const sql = `update
        CARD_FRONT_TABLE
    set
        DUE_DATE = DATE_ADD(DUE_DATE,INTERVAL ? SECOND)
        ,E_FACTOR = ?
        ,REPETITION = ?
    where
        FRONT_ID = ?
    `;
    conn.query(sql, [interval, eFactor, repetition, frontId], err => {
        console.log('백앤드로 넘어옴?');
        if (err) {
            res.send(false);
            throw err;
        }
        res.send(true);
    });
});

module.exports = router;

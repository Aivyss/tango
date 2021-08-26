const express = require('express');
const router = express.Router();
const conn = require('../database');

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
    conn.beginTransaction(err => {
        if (err) {
            console.log(err);
            throw err;
        }

        const paramOne = [req.body.cardName, req.body.userId];
        const sqlOne = `INSERT INTO KIND_OF_CARD_TABLE 
                (CARD_NAME, USER_ID) 
            VALUES
                (?, ?)`;
        let kindTablePK;
        conn.query(sqlOne, paramOne, error => {
            if (error) throw error;

            conn.query('SELECT LAST_INSERT_ID()', (keySelectError, kindId, field) => {
                if (keySelectError) throw keySelectError;
                else {
                    kindTablePK = JSON.parse(JSON.stringify(kindId))[0]['LAST_INSERT_ID()'];
                    console.log('🚀 ~ file: cardsRoutes.js ~ line 39 ~ conn.query ~ kindId', kindId);
                    console.log('🚀 ~ file: cardsRoutes.js ~ line 39 ~ conn.query ~ kindTablePK', kindTablePK);

                    const sqlTwo = `INSERT INTO CARD_COL_TABLE 
                            (KIND_ID, COL_NAME) 
                        VALUES
                            (?, ?)`;
                    const paramTwo = req.body.backFields;
                    console.log('🚀 ~ file: cardsRoutes.js ~ line 46 ~ conn.query ~ paramTwo', paramTwo);
                    paramTwo.map((curr, index) =>
                        conn.query(sqlTwo, [kindTablePK, curr], backFieldsError => {
                            if (backFieldsError) {
                                conn.rollback(() => {
                                    throw backFieldsError;
                                });
                            }

                            if (index === paramTwo.length - 1) conn.commit();
                        }),
                    );
                }
            });
        });
    });
});

module.exports = router;

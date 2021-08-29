/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["curr"] }] */
const express = require('express');
const router = express.Router();
const conn = require('../database');
const pool = require('../database2');
// 전체덱 조회
router.get('/callAllDecks', (req, res) => {
    const params = [req.query.id];
    const sql = `SELECT * FROM DECK_TABLE WHERE USER_ID = ?`;
    console.log('전체덱 호출 id=', req.query.id);

    conn.query(sql, params, (err, rows, field) => {
        console.log('덱리스트: ', JSON.parse(JSON.stringify(rows)));
        res.send(JSON.parse(JSON.stringify(rows)));
    });
});

// 덱 이름 중복조회
router.get('/checkDuplicated-deck-name', (req, res) => {
    const params = [req.query.name, req.query.userId];
    const sql = `SELECT * FROM DECK_TABLE WHERE DECK_NAME = ? AND USER_ID = ?`;
    console.log('덱 이름 중복 확인=', req.query.name);

    conn.query(sql, params, (err, rows, field) => {
        res.send(rows);
    });
});

// 덱 생성
router.post('/create-deck', (req, res) => {
    const params = [req.body.deckName, req.body.userId];
    console.log('🚀 ~ file: decksRoutes.js ~ line 32 ~ router.post ~ params', params);
    const sql = `INSERT INTO DECK_TABLE (DECK_NAME, USER_ID) VALUES (?, ?)`;
    console.log('덱이름 =', params);

    conn.query(sql, params, (err, rows, field) => {
        if (err) throw err;

        res.send(rows);
    });
});

// 덱 정보 요청
router.get('/get-deck-info', (req, res) => {
    const params = [Number(req.query.deckId)];
    const sqlOne = `select
        COUNT(*)
    from
        CARD_FRONT_TABLE
    where
        CREATE_DATE = DUE_DATE
        and
        DECK_ID = ?
    ORDER BY
        RAND()
    `;
    const sqlTwo = `select
        COUNT(*)
    from
        CARD_FRONT_TABLE
    where
        CREATE_DATE <> DUE_DATE
        and
        DUE_DATE <= NOW()
        and
        DECK_ID = ?
    order by
        RAND()
    `;
    (async () => {
        const connection = await pool.getConnection(async conn2 => conn2);
        try {
            let newRows = await connection.query(sqlOne, params);
            newRows = JSON.parse(JSON.stringify(newRows[0][0]['COUNT(*)']));
            console.log('🚀 ~ file: decksRoutes.js ~ line 59 ~ newRows', newRows);
            let oldRows = await connection.query(sqlTwo, params);
            oldRows = JSON.parse(JSON.stringify(oldRows[0][0]['COUNT(*)']));
            console.log('🚀 ~ file: decksRoutes.js ~ line 75 ~ oldRows', oldRows);
            res.send({newCard: newRows, reviewCard: oldRows});
        } catch (err) {
            console.log(err);
            res.send({});
        } finally {
            connection.release();
        }
    })();
});

// 공부할 카드 호출
router.get('/call-study-card', (req, res) => {
    (async () => {
        const connection = await pool.getConnection(async conn2 => conn2);

        try {
            const deckId = Number(req.query.deckId);
            const sqlOne = `select
                *
            from
                CARD_FRONT_TABLE
            where
                DECK_ID = ?
                AND
                DUE_DATE <= NOW()
            order by
                RAND()
            `;
            const sqlTwo = `select
                *
            from
                CARD_BACK_TABLE
            where
                FRONT_ID = ?
            `;
            let [rows] = await connection.query(sqlOne, [deckId]);
            rows = JSON.parse(JSON.stringify(rows));

            await Promise.all(
                rows.map(async curr => {
                    const backs = await connection.query(sqlTwo, [curr.FRONT_ID]);
                    curr.BACK_COLS = JSON.parse(JSON.stringify(backs[0]));
                }),
            );

            res.send(rows);
        } catch (err) {
            console.log('🚀 ~ file: decksRoutes.js ~ line 56 ~ err', err);
            res.send([]);
        } finally {
            connection.release();
        }
    })();
});

module.exports = router;

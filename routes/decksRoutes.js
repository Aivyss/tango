/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["curr"] }] */
const {json} = require('body-parser');
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
    const params = [req.query.name];
    const sql = `SELECT * FROM DECK_TABLE WHERE DECK_NAME = ?`;
    console.log('덱 이름 중복 확인=', req.query.name);

    conn.query(sql, params, (err, rows, field) => {
        res.send(rows);
    });
});

// 덱 생성
router.post('/create-deck', (req, res) => {
    const params = [req.body.deckName, req.body.userId];
    const sql = `INSERT INTO DECK_TABLE (DECK_NAME, USER_ID) VALUES (?, ?)`;
    console.log('덱이름 =', params);

    conn.query(sql, params, (err, rows, field) => {
        res.send(rows);
    });
});

// 덱 정보 요청
router.get('/get-deck-info', (req, res) => {
    const params = [Number(req.query.deckId)];
    console.log('DeckId = ', params);

    // 테스트단
    res.send({newCard: 25, reviewCard: 10});
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

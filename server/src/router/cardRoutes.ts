/* eslint no-param-reassign: ["error", { "props": false }] */
import express from 'express';
import {conn, pool} from '../database';
import {RowDataPacket} from 'mysql2';
const router = express.Router();

// 카드이름 중복조회
router.get('/checkDuplicateCardName', (req, res) => {
    const {userId, cardName} = req.query as {userId: string; cardName: string};
    const sql = 'SELECT * FROM KIND_OF_CARD_TABLE WHERE USER_ID = ? AND CARD_NAME = ?';

    conn.query(sql, [Number(userId), cardName], (err, rows, fields) => {
        if (err) throw err;
        console.log(rows);
        console.log('🚀 ~ file: server.js ~ line 133 ~ connection.query ~ rows', rows);
        res.send(JSON.parse(JSON.stringify(rows)));
    });
});

// 카드 카테고리 생성
router.post('/create-card-category', (req, res) => {
    (async () => {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const paramOne: string[] | number[] = [req.body.cardName, req.body.userId];
            const paramTwo: string[] | number[] = req.body.backFields;
            const sqlOne: string = `INSERT INTO KIND_OF_CARD_TABLE
                (CARD_NAME, USER_ID)
            VALUES
                (?, ?)`;
            const sqlTwo: string = `INSERT INTO CARD_COL_TABLE
                (KIND_ID, COL_NAME)
            VALUES
                (?, ?)`;
            await connection.query(sqlOne, paramOne);

            const [rows] = await connection.query('SELECT LAST_INSERT_ID()');
            const kindTablePK = JSON.parse(JSON.stringify(rows))[0]['LAST_INSERT_ID()'] as number;

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
});

// 카드 카테고리 전체조회
router.get('/call-all-card-categories', (req, res) => {
    const {userId} = req.query as {userId: string};
    const sql: string = `SELECT * FROM KIND_OF_CARD_TABLE WHERE USER_ID = ?`;
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
    const {cardId} = req.query as {cardId: string};
    console.log('🚀 ~ file: cardsRoutes.js ~ line 85 ~ router.get ~ cardId', cardId);
    const sql: string = 'SELECT * FROM CARD_COL_TABLE WHERE KIND_ID = ?';

    conn.query(sql, [Number(cardId)], (err, rows, fields) => {
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
    const {cardId, deckId, str} = req.query as {cardId: string; deckId: string; str: string};
    const sql: string = 'select * from CARD_FRONT_TABLE where KIND_ID = ? and DECK_ID = ? and FRONT_DATA =?';

    conn.query(sql, [Number(cardId), Number(deckId), str], (err, rows, fields) => {
        if (err) {
            console.log(err);
            throw err;
        } else {
            const data = rows as RowDataPacket[];
            res.send(data.length > 0);
        }
    });
});

// 카드 생성
router.post('/create-card', (req, res) => {
    const {
        deckId,
        cardId,
        front,
        colsValues,
    }: {
        deckId: number;
        cardId: number;
        front: string;
        colsValues: {[index: number]: string};
    } = req.body;

    (async () => {
        const connection = await pool.getConnection();

        try {
            // 프론트 인서트문
            const sqlOne: string = `insert into CARD_FRONT_TABLE (
                FRONT_DATA
                ,DECK_ID
                ,KIND_ID
            ) values(
                ?, ? ,?
            )`;
            // 프라이머리키 셀렉트
            const sqlTwo: string = `select LAST_INSERT_ID()`;
            // 백 인서트문
            const sqlThree: string = `insert into CARD_BACK_TABLE (
                FRONT_ID
                ,CARD_COL_ID
                ,BACK_DATA
            ) values (
                ?, ?, ?
            )`;
            await connection.query(sqlOne, [front as string, deckId as number, cardId as number]);
            let [rows] = await connection.query(sqlTwo);
            const insertId = JSON.parse(JSON.stringify(rows))[0]['LAST_INSERT_ID()'] as number;

            Promise.all(
                Object.keys(colsValues).map(async prop => {
                    await connection.query(sqlThree, [insertId, Number(prop), colsValues[Number(prop)]]);
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
});

// 학습 업데이트
router.put('/update-cards-status', (req, res) => {
    const {
        interval,
        frontId,
        eFactor,
        repetition,
        dueDate,
    }: {
        interval: string;
        frontId: string;
        eFactor: string;
        repetition: string;
        dueDate: string;
    } = req.body;
    const newDueDate: number = Math.floor(new Date(dueDate).getTime() / 1000) + Number(interval) * 86400;
    const sql: string = `update CARD_FRONT_TABLE
	set 
        DUE_DATE = STR_TO_DATE(
            FROM_UNIXTIME(?, "%Y-%m-%d %H:%i:%S"), 
            "%Y-%m-%d %H:%i:%S"
        )
        ,E_FACTOR = ?
        ,REPETITION = ?
    where
        FRONT_ID = ?
    `;
    conn.query(sql, [newDueDate, Number(eFactor), Number(repetition), Number(frontId)], err => {
        if (err) {
            res.send(false);
            throw err;
        }
        res.send(true);
    });
});

// 카드 전체 조회 (덱무관)
router.get('/call-all-of-cards', (req, res) => {
    const userId = Number(req.query.userId);
    const sqlOne: string = `select 
        D.DECK_ID
        ,D.DECK_NAME
        ,F.FRONT_DATA
        ,F.FRONT_ID
        ,F.DUE_DATE
        ,K.KIND_ID
        ,K.CARD_NAME
    from
        DECK_TABLE as D
        ,CARD_FRONT_TABLE as F
        ,KIND_OF_CARD_TABLE as K
        ,USER_TABLE as U
    where 
        K.KIND_ID = F.KIND_ID
        and 
        D.DECK_ID = F.DECK_ID 
        and
        U.ID = ?`;
    conn.query(sqlOne, [userId], (err, rows) => {
        if (err) throw err;
        res.send(JSON.parse(JSON.stringify(rows)));
    });
});

// back column update
router.put('/edit-back-col', (req, res) => {
    const {BACK_ID, BACK_DATA} = req.body as {BACK_ID: string; BACK_DATA: string};
    const sql = `update CARD_BACK_TABLE
    SET
        BACK_DATA = ?
    WHERE
        BACK_ID = ?`;

    conn.query(sql, [BACK_DATA, Number(BACK_ID)], err => {
        if (err) throw err;
        res.send(true);
    });
});

// front card update
router.put('/change-front-data', (req, res) => {
    const {frontId, frontData} = req.body as {frontId: string; frontData: string};
    const sql = `update CARD_FRONT_TABLE
    set
        FRONT_DATA = ?
    where
        FRONT_ID = ?`;

    conn.query(sql, [frontData, Number(frontId)], err => {
        if (err) throw err;
    });
});

// call back columns
router.get('/get-back-cols', (req, res) => {
    const frontId = Number(req.query.frontId);
    const sql = `select 
                *
            from 
                CARD_BACK_TABLE
            where 
                FRONT_ID = ?`;
    conn.query(sql, [frontId], (err, rows) => {
        if (err) throw err;
        res.send(JSON.parse(JSON.stringify(rows)));
    });
});

export default router;

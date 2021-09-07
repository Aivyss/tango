/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["curr"] }] */
import express from 'express';
import {conn, pool} from '../database';
import {RowDataPacket, FieldPacket} from 'mysql2';
import {FrontCardTable, BackCardTable} from '../database/dbInterfaces';
const router = express.Router();

interface StudyCard extends FrontCardTable {
    BACK_COLS: BackCardTable[];
}

// 전체덱 조회
router.get('/callAllDecks', (req, res) => {
    const params = [Number(req.query.id)];
    const sql: string = `SELECT * FROM DECK_TABLE WHERE USER_ID = ?`;
    console.log('전체덱 호출 id=', req.query.id);

    conn.query(sql, params, (err, rows, field) => {
        console.log('덱리스트: ', JSON.parse(JSON.stringify(rows)));
        res.send(JSON.parse(JSON.stringify(rows)));
    });
});

// 덱 이름 중복조회
router.get('/checkDuplicated-deck-name', (req, res) => {
    const {name, userId} = req.query as {name: string; userId: string};
    const sql = `SELECT * FROM DECK_TABLE WHERE DECK_NAME = ? AND USER_ID = ?`;
    console.log('덱 이름 중복 확인=', req.query.name);

    conn.query(sql, [name, Number(userId)], (err, rows, field) => {
        res.send(rows);
    });
});

// 덱 생성
router.post('/create-deck', (req, res) => {
    const {deckName, userId} = req.body as {deckName: string; userId: string};
    const sql: string = `INSERT INTO DECK_TABLE (DECK_NAME, USER_ID) VALUES (?, ?)`;

    conn.query(sql, [deckName, Number(userId)], (err, rows, field) => {
        if (err) throw err;

        res.send(rows);
    });
});

// 덱 정보 요청
router.get('/get-deck-info', (req, res) => {
    const params = [Number(req.query.deckId)];
    const sqlOne: string = `select
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
    const sqlTwo: string = `select
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
        const connection = await pool.getConnection();
        try {
            // FieldPacket 인자는 아래와 같이 SQL 실행 결과 필드값에 대한 정보를 리턴합니다. 활용할 일이 거의 없으므로 field 인자는 생략해도 됩니다.
            const newRows = (await connection.query(sqlOne, params))[0] as RowDataPacket[];
            const newCard = JSON.parse(JSON.stringify(newRows[0]['COUNT(*)'])) as number;
            console.log('🚀 ~ file: decksRoutes.js ~ line 59 ~ newCard', newCard);
            const reviewRows = (await connection.query(sqlTwo, params))[0] as RowDataPacket[];
            const reviewCard = JSON.parse(JSON.stringify(reviewRows[0]['COUNT(*)'])) as number;
            console.log('🚀 ~ file: decksRoutes.js ~ line 75 ~ reviewCard', reviewCard);

            res.send({newCard: newCard, reviewCard: reviewCard});
        } catch (err) {
            console.log(err);
            res.send({newCard: 0, reviewCard: 0});
        } finally {
            connection.release();
        }
    })();
});

// 공부할 카드 호출
router.get('/call-study-card', (req, res) => {
    (async () => {
        const connection = await pool.getConnection();

        try {
            const deckId = Number(req.query.deckId);
            const sqlOne: string = `select
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
            const sqlTwo: string = `select
                *
            from
                CARD_BACK_TABLE
            where
                FRONT_ID = ?
            `;
            const [rows] = await connection.query(sqlOne, [deckId]);
            const cardRows = JSON.parse(JSON.stringify(rows)) as FrontCardTable[];

            const refinedRows: StudyCard[] = await Promise.all(
                cardRows.map(async curr => {
                    const backs = await connection.query(sqlTwo, [curr.FRONT_ID]);
                    return {...curr, BACK_COLS: JSON.parse(JSON.stringify(backs[0])) as BackCardTable[]};
                }),
            );

            res.send(refinedRows);
        } catch (err) {
            console.log('🚀 ~ file: decksRoutes.js ~ line 56 ~ err', err);
            res.send([] as StudyCard[]);
        } finally {
            connection.release();
        }
    })();
});

export default router;

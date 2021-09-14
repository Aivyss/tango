import express from 'express';
import {conn, pool} from '../database';
import {BoardCategTable} from '../database/dbInterfaces';
const router = express.Router();

router.get('/getCategs', (req, res) => {
    const sql = ` select * from BOARD_CATEG_TABLE`;
    conn.query(sql, [], (err, result, field) => {
        if (err) throw err;

        const sendData = JSON.parse(JSON.stringify(result)) as BoardCategTable[];
        res.send(sendData);
    });
});

export default router;

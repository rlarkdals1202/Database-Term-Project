import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import fs from 'fs';

const connectInformation =
{
    host: '192.168.162.101',
    port: '4567',
    user: 'kangminKim',
    password: '1234',
    database: 'abandoned_animal_care',
};

const router = express.Router();

router.use(cors({origin: true, credentials: true}));
router.use(express.json());
router.use(bodyParser.urlencoded({extended : false}));

router.get('/', (req, res, next) =>
{
    fs.createReadStream('./public/HTML/suggestion.html').pipe(res);
});

router.get('/content', async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const query = `SELECT board_date, board_category, board_title, board_content FROM shelter_suggestions WHERE employee_id = "${req.user}" AND board_id = ${req.query.id}`;
        const [results, fields] = await connection.query(query);
        connection.end();
        res.status(200).send(results);
    }
    catch(error)
    {
        console.error(error);
        connection.end();
        res.status(500).send("error");
    }
});

router.get('/information', async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const query = `SELECT board_id, board_date, board_category, board_title FROM shelter_suggestions WHERE employee_id = "${req.user}"`;
        const [results, fields] = await connection.query(query);
        console.log(results[0]);
        connection.end();
        res.status(200).send(results);
    }
    catch(error)
    {
        console.error(error);
        connection.end();
        res.status(500).send("error");
    }
});

router.get('/writing', (req, res, next) =>
{
    fs.createReadStream('./public/HTML/suggestionWriting.html').pipe(res);
});

router.post('/writing/submit', async (req, res, next) =>
{
    const dateFormat = (date) =>
    {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = (month >= 10) ? (month) : ('0' + month);
        day = (day >= 10) ? (day) : ('0' + day);

        return `${date.getFullYear()}-${month}-${day}`;
    }
    const title = req.body.title;
    const content = req.body.content;
    const category = req.body.category;
    const date = dateFormat(new Date());
    const employeeId = req.user;
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const [numberOfBoards] = await connection.query(`SELECT COUNT(*) FROM shelter_suggestions WHERE employee_id = "${req.user}"`);
        const boardId = numberOfBoards[0]["COUNT(*)"] + 1;
        const query = `INSERT INTO shelter_suggestions(board_id, board_title, board_category, board_date, board_content, employee_id) VALUES(${boardId}, "${title}", "${category}", "${date}", "${content}", "${employeeId}")`;
        const [results, fields] = await connection.query(query);
        if(results)
        {
            res.status(500).send(`<script>alert("글을 성공적으로 작성하였습니다."); window.location.href="http://localhost:8080/suggestion";</script>`);   
        }
        else
        {
            throw new Error();
        }
    }
    catch(error)
    {
        connection.end();
        console.error(error);
        res.status(500).send(`<script>alert("오류가 발생했습니다."); window.location.href="http://localhost:8080/suggestion";</script>`);
    }
});

export default router;
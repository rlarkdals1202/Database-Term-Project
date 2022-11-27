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
}

const router = express.Router();

router.use(cors({origin: true, credentials: true}));
router.use(express.json());
router.use(bodyParser.urlencoded({extended : false}));

router.get('/', (req, res, next) =>
{
    fs.createReadStream('./public/HTML/improvement.html').pipe(res);
});

router.get('/content', async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const query = `SELECT board_id, board_date, board_category, board_title, board_content FROM program_improvements WHERE employee_id = "${req.user}" AND board_id = ${req.query.id}`;
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

router.delete('/delete', async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const countQuery = `SELECT COUNT(*) FROM program_improvements WHERE employee_id = "${req.user}"`;
        const [countResults] = await connection.query(countQuery);
        const numberOfBoards = countResults[0]["COUNT(*)"];
        const deleteQuery = `DELETE FROM program_improvements WHERE board_id = ${req.body.boardId} AND employee_id = "${req.user}"`;
        const [deleteResults] = await connection.query(deleteQuery);
        const afterQuery = `SELECT board_id FROM program_improvements WHERE employee_id = "${req.user}"`;
        const [afterResults] = await connection.query(afterQuery);
        if(deleteResults)
        {
            if(afterResults.length === 0)
            {
                connection.end();
                res.status(200).send("success");
            }
            else
            {
                for(let i = 1; i < numberOfBoards; i++)
                {
                    const updateQuery = `UPDATE program_improvements SET board_id = ${i} WHERE board_id = ${afterResults[i-1].board_id} AND employee_id = "${req.user}"`;
                    const [updateResults] = await connection.query(updateQuery);
                    if(!updateResults)
                    {
                        throw new Error();
                    }
                }
                connection.end();
                res.status(200).send("success");
            }
        } 
        else
        {
            throw new Error();
        }
    }
    catch(error)
    {
        console.error(error);
        connection.end();
        res.status(500).send("error");
    }
});

router.get('/update', async (req, res, next) =>
{
    fs.createReadStream("./public/HTML/improvementUpdate.html").pipe(res);
});

router.put('/update/process', async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const boardId = req.body.boardId;
        const boardTitle = req.body.boardTitle;
        const boardCategory = req.body.boardCategory;
        const boardContent = req.body.boardContent;
        const updateQuery = `UPDATE program_improvements SET board_title = "${boardTitle}", board_category = "${boardCategory}", board_content = "${boardContent}" WHERE employee_id = "${req.user}" AND board_id = ${boardId}`;
        const [updateResults] = await connection.query(updateQuery);
        if(updateResults)
        {
            connection.end();
            res.status(200).send("success");
        }
        else
        {
            connection.end();
            throw new Error();
        }
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
        const query = `SELECT board_id, board_date, board_category, board_title FROM program_improvements WHERE employee_id = "${req.user}"`;
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

router.get('/writing', (req, res, next) =>
{
    fs.createReadStream('./public/HTML/improvementWriting.html').pipe(res);
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
        const [numberOfBoards] = await connection.query(`SELECT COUNT(*) FROM program_improvements WHERE employee_id = "${req.user}"`);
        const boardId = numberOfBoards[0]["COUNT(*)"] + 1;
        const query = `INSERT INTO program_improvements(board_id, board_title, board_category, board_date, board_content, employee_id) VALUES(${boardId}, "${title}", "${category}", "${date}", "${content}", "${employeeId}")`;
        const [results, fields] = await connection.query(query);
        if(results)
        {
            res.status(200).send(`<script>alert("글을 성공적으로 작성하였습니다."); window.location.href="http://localhost:8080/improvement";</script>`);   
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
        res.status(500).send(`<script>alert("오류가 발생했습니다."); window.location.href="http://localhost:8080/improvement";</script>`);
    }
});

export default router;
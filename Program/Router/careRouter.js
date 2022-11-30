import express, { query } from 'express';
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
    fs.createReadStream('./public/HTML/care.html').pipe(res);
});

router.get('/add', (req, res, next) =>
{
    fs.createReadStream('./public/HTML/careAdd.html').pipe(res);
});

router.get('/animalId', async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const query = `SELECT animal_id FROM animal`;
        const [results] = await connection.query(query);
        if(results)
        {
            connection.end();
            res.status(200).send(results);
        }
    }
    catch(error)
    {
        connection.end();
        console.error(error);
        res.status(500).send("error");
    }
});

router.get("/animalList", async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const query = `SELECT * FROM animal WHERE employee_id = "${req.user}"`;
        const [results] = await connection.query(query);
        if(results)
        {
            connection.end();
            res.status(200).send(results);
        }
    }
    catch(error)
    {
        connection.end();
        console.error(error);
        res.status(500).send("error");
    }
});

router.get("/animalType", async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const query = `SELECT animal_type FROM animal_sort_information WHERE animal_sort = "${req.query.animalSort}"`;
        const [result] = await connection.query(query);
        if(result)
        {
            connection.end();
            res.status(200).send(result);
        }
    }
    catch(error)
    {
        connection.end();
        console.error(error);
        res.status(500).send("error");
    }
});

router.get("/animalInformation", async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const query = `SELECT * FROM animal WHERE animal_id = "${req.query.animalId}" AND employee_id = "${req.user}"`;
        const [results] = await connection.query(query)
        if(results)
        {
            connection.end();
            res.status(200).send(results);
        } 
    }
    catch(error)
    {
        connection.end();
        console.error(error);
        res.status(500).send("error");
    }
});

router.get('/update', (req, res, next) =>
{
    fs.createReadStream('./public/HTML/careUpdate.html').pipe(res);
});

router.delete('/delete', async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const deleteQuery = `DELETE FROM animal WHERE employee_id = "${req.user}" AND animal_id = "${req.body.animalId}"`;
        const [result] = await connection.query(deleteQuery);
        if(result)
        {
            connection.end();
            res.status(200).send("success");
        }
    }
    catch(error)
    {
        connection.end();
        console.error(error);
    }
});

router.post('/add/submit', async (req, res, next) =>
{
    const animalSort = req.body.animalSort;
    const animalName = req.body.animalName;
    const animalMemo = req.body.animalMemo;
    const animalGender = req.body.animalGender;
    const animalAge = req.body.animalAge;
    const animalId = req.body.animalId;
    const employeeId = req.user;
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const query = `INSERT INTO animal(animal_id, animal_sort, animal_gender, animal_age, employee_id, animal_memo, animal_name) VALUES("${animalId}", "${animalSort}", "${animalGender}", ${animalAge}, "${employeeId}", "${animalMemo}", "${animalName}")`;
        const [results] = await connection.query(query);
        if(results)
        {
            connection.end();
            res.status(200).send("success");
        }
    }
    catch(error)
    {
        connection.end();
        console.error(error);
        res.status(500).send("error");
    }
});

router.put('/update/process', async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const animalId = req.body.animalId;
        const animalSort = req.body.animalSort;
        const animalName = req.body.animalName;
        const animalGender = req.body.animalGender;
        const animalMemo = req.body.animalMemo;
        const animalAge = req.body.animalAge;
        const updateQuery = `UPDATE animal SET animal_sort = "${animalSort}", animal_gender = "${animalGender}", animal_age = "${animalAge}", animal_memo = "${animalMemo}" WHERE employee_id = "${req.user}" AND animal_id = "${animalId}"`
        const [updateResults] = await connection.query(updateQuery);
        if(updateResults)
        {
            connection.end();
            res.status(200).send("success");
        }
    }
    catch(error)
    {
        console.error(error);
        connection.end();
        res.status(500).send("error");
    }
});


export default router;
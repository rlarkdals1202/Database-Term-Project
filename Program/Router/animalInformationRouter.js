import express from 'express';
import cors from 'cors';
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

router.get("/", (req, res, next) =>
{
    fs.createReadStream('./public/HTML/animalInformation.html').pipe(res);
});

router.get("/ids", async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const query = `SELECT animal_id, animal_sort FROM animal`;
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

router.get("/animalData", async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const query = `SELECT * FROM animal NATURAL JOIN animal_sort_information WHERE animal_id = "${req.query.animalId}"`;
        const [result] = await connection.query(query);
        if(result)
        {
            connection.end();
            res.status(200).send(result);
        }
    }
    catch
    {
        connection.end();
        console.error(error);
        res.status(500).send("error");
    }
});

export default router;
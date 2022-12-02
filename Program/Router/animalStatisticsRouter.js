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
    fs.createReadStream('./public/HTML/animalStatistics.html').pipe(res);
});

router.get("/animalGender", async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const getFemaleQuery = `SELECT COUNT(*) FROM animal WHERE animal_gender = "female"`;
        const getMaleQuery = `SELECT COUNT(*) FROM animal WHERE animal_gender = "male"`;
        const [fResult] = await connection.query(getFemaleQuery);
        const [mResult] = await connection.query(getMaleQuery);
        if(fResult.length !== 0 && mResult.length !== 0)
        {
            const animalGender = {male: mResult[0]["COUNT(*)"], female: fResult[0]["COUNT(*)"]};
            connection.end();
            res.status(200).send(animalGender);
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

router.get("/animalAge", async (req, res, next) =>
{ 
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const getX1Query = `SELECT COUNT(*) FROM animal WHERE animal_age BETWEEN 0 AND 5`;
        const getX2Query = `SELECT COUNT(*) FROM animal WHERE animal_age BETWEEN 6 AND 9`;
        const getX3Query = `SELECT COUNT(*) FROM animal WHERE animal_age BETWEEN 10 AND 14`;
        const getX4Query = `SELECT COUNT(*) FROM animal WHERE animal_age BETWEEN 15 AND 19`;
        const getX5Query = `SELECT COUNT(*) FROM animal WHERE animal_age > 19`;

        const [x1Result] = await connection.query(getX1Query);
        const [x2Result] = await connection.query(getX2Query);
        const [x3Result] = await connection.query(getX3Query);
        const [x4Result] = await connection.query(getX4Query);
        const [x5Result] = await connection.query(getX5Query);

        if(x1Result.length != 0 && x2Result.length != 0 && x3Result.length != 0 && x4Result.length != 0 && x5Result.length != 0)
        {
            const animalAge =
            {
                x1: x1Result[0]["COUNT(*)"],
                x2: x2Result[0]["COUNT(*)"],
                x3: x3Result[0]["COUNT(*)"],
                x4: x4Result[0]["COUNT(*)"],
                x5: x5Result[0]["COUNT(*)"],
            }
            res.status(200).send(animalAge);
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

export default router;
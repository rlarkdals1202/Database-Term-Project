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
    fs.createReadStream('./public/HTML/animalHospital.html').pipe(res);
});

router.get('/content', async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const hospitalAddress = req.query.address;
        const query = `SELECT animal_hospital_address, animal_hospital_name, animal_hospital_contact, animal_hospital_information FROM animal_hospital_address_book WHERE animal_hospital_address = "${hospitalAddress}"`;
        const [results] = await connection.query(query)
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

router.get('/ids', async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const query = `SELECT shelter_id FROM employee WHERE employee_id = "${req.user}"`;
        const [result] = await connection.query(query);
        if(result)
        {
            const shelterId = result[0].shelter_id;
            const getHospitalQuery = `SELECT animal_hospital_id FROM cooperation WHERE shelter_id ="${shelterId}"`;
            const [getHospitalResult] = await connection.query(getHospitalQuery);
            if(getHospitalResult)
            {
                connection.end();
                res.status(200).send(getHospitalResult);
            }
        }
    }
    catch(error)
    {
        console.error(error);
        connection.end();
        res.status(500).send("error");
    }
});

router.get("/addresses", async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const hospitalId = req.query.hospitalId;
        const query = `SELECT animal_hospital_address FROM animal_hospital WHERE animal_hospital_id = "${hospitalId}"`;
        const [results] = await connection.query(query);
        if(results)
        {
            res.status(200).send(results);
        }
    }
    catch(error)
    {
        console.error(error);
        connection.end();
        res.status(500).send("error");
    }
});

router.get("/names", async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const hospitalAddress = req.query.hospitalAddress;
        const query = `SELECT animal_hospital_name FROM animal_hospital_address_book WHERE animal_hospital_address = "${hospitalAddress}"`;
        const [results] = await connection.query(query);
        if(results)
        {
            res.status(200).send(results);
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
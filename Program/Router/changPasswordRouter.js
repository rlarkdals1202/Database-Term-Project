import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
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
    fs.createReadStream('./public/HTML/changePassword.html').pipe(res);
});

router.post('/change', async (req, res, next) =>
{
    const connection = await mysql.createConnection(connectInformation);
    try
    {
        const hashedPassword = await bcrypt.hash(req.body.employeePassword, 7);
        const query = `UPDATE employee SET employee_password = '${hashedPassword}' WHERE employee_id = '${req.user}'`;
        const [results, fields] = await connection.query(query);
        if(results)
        {
            connection.end();
            res.status(200).send(`<script>alert("비밀번호를 성공적으로 변경하였습니다."); window.location.href = "http://localhost:8080/index";</script>`);
        }
        else
        {
            connection.end();
            throw new Error();
        }
    }
    catch(error)
    {
        connection.end();
        console.error(error);
    }
});

export default router;
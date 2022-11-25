import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import fs from 'fs';

const router = express.Router();

router.use(cors({origin: true, credentials: true}));
router.use(express.json());

router.get('/', (req, res, next) =>
{
    if(!req.user)
    {
        next(new Error());
    }
    fs.createReadStream('./public/HTML/index.html').pipe(res);
});

router.get('/employeeName', (req, res, next) =>
{
    res.send(req.user);
});

export default router;
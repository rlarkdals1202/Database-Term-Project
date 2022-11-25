import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import passport from 'passport';
import passportLocal from 'passport-local';
import mysql from 'mysql2/promise';
import fs from 'fs';

const LocalStartegy = passportLocal.Strategy;
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
    fs.createReadStream('./public/HTML/login.html').pipe(res);
});

router.post('/process', (req, res, next) =>
{
    passport.authenticate('local', (error, user, info) =>
    {
        if(error)
        {
            res.status(500).send("Server Error");
            return;
        }
        if(!user)
        {
            const faultScript = 
            `
            <script>
            alert("아이디 또는 비밀번호를 확인해주세요.");
            window.location.href = 'http://localhost:8080/login';
            </script>
            `
            res.status(401).send(faultScript);
            return;
        }
        return req.login(user, loginError =>
            {
                if(loginError)
                {
                    res.status(500).send("Server Error");
                }
                else
                {
                    res.status(201).redirect('http://localhost:8080/index');
                }
            })
    })(req, res, next);
});

passport.use(new LocalStartegy(
    {
        usernameField: 'employeeId',
        passwordField: 'employeePassword',
    },

    async (username, password, done) =>
    {
        try
        {
            const connection = await mysql.createConnection(connectInformation);
            const query = `SELECT * FROM employee WHERE employee_id = '${username}'`;
            const [results, fields] = await connection.query(query);
            console.log(results);
            if(results.length === 0)
            {
                connection.end();
                return (done(null, false, {message: "Incorrect Error"}));
            }
            const isAuthenticate = await bcrypt.compare(password, results[0].employee_password);
            console.log(isAuthenticate);
            if(isAuthenticate)
            {
                const employeeId = results[0].employee_id;
                connection.end();
                return (done(null, employeeId));
            }
            else
            {
                connection.end();
                return (done(null, false, {message: "Incorrect Error"}))
            }
        }
        catch(error)
        {
            connection.end();
            console.error(error);
        }
    }
));

passport.serializeUser((user, done) =>
{
    done(null, user);
});

passport.deserializeUser((employeeId, done) =>
{
    done(null, employeeId);
});

router.get('/logout', (req, res, next) =>
{
    if(!req.user)
    {
        next(new Error());
    }
    else
    {
        req.logOut(error =>
            {
                if(error)
                {
                    console.error(error);
                }
                else
                {
                    req.session.destroy(() =>
                    {
                        res.clearCookie('connect.sid');
                        res.status(200).send("success");
                    });
                }
            })
    }
});

export default router;
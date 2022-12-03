import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import loginRouter from './Router/loginRouter.js';
import indexRouter from './Router/indexRouter.js';
import changePasswordRouter from './Router/changPasswordRouter.js';
import suggestionRouter from './Router/suggestionRouter.js';
import improvementRouter from './Router/improvementRouter.js';
import animalHospitalRouter from './Router/animalHospitalRouter.js';
import animalStatisticsRouter from './Router/animalStatisticsRouter.js';
import caresRouter from './Router/careRouter.js';
import animalInformationRouter from './Router/animalInformationRouter.js';
import fs from 'fs';

const app = express();
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser('keyboard cat'));
app.use(session({secret : 'keyboard cat', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.listen(8080, () =>
{
    console.log("Server is running.");
});

app.use('/login', loginRouter);
app.use('/index', indexRouter);
app.use('/password', changePasswordRouter);
app.use('/suggestion', suggestionRouter);
app.use('/improvement', improvementRouter);
app.use('/care', caresRouter);
app.use('/animal/hospital', animalHospitalRouter);
app.use('/animal/statistics', animalStatisticsRouter);
app.use('/animal/information', animalInformationRouter);

app.use((req, res, next) =>
{
    fs.createReadStream('./public/HTML/404NotFound.html').pipe(res);
});

app.use((error, req, res, next) =>
{
    console.error(error);
    res.status(500).send("error");
});
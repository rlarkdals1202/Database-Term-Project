import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import loginRouter from './Router/loginRouter.js';
import indexRouter from './Router/indexRouter.js';
import changePasswordRouter from './Router/changPasswordRouter.js';

const app = express();
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser('keyboard cat'));
app.use(session({secret : 'keyboard cat', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.listen(8080);

app.use('/login', loginRouter);
app.use('/index', indexRouter);
app.use('/password', changePasswordRouter);

app.use((error, req, res, next) =>
{
    res.status(403).send("error");
});
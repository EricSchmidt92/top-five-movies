import express, { Application, Request, Response, Router } from 'express';
import { usersRouter } from './routes/users';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const LocalStrategy = passportLocal.Strategy;

dotenv.config();
// Set up app
const app: Application = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || '',
    resave: true,
    saveUninitialized: false,
  })
);

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./auth/passportConfig')(passport);

// ROUTES
app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.use('/users', usersRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));

import express, { Application, Request, Response, Router } from 'express';
import { usersRouter } from './routes/users';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';

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
    resave: false,
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

import express, { Request, Response } from 'express';
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';

const router: Router = express.Router();
// import db from '../db';
const db = require('../db');

// * GET LOGGED IN USER
router.get('/', (req, res) => {
  res.send(req.user);
});

// * LOG IN A USER
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/users/fail',
    successRedirect: '/users/success',
  }),
  (req, res) => {
    res.send(req.body);
  }
);

router.get('/fail', (req: Request, res: Response) => {
  res.json({ message: 'failure to log in' });
});

router.get('/success', (req, res) => {
  res.json({ message: 'success in logging in', user: req.user });
});

// * LOG OUT A USER
router.get('/logout', (req, res) => {
  req.logout();
  res.send('logging out');
});

// * CREATING ONE
router.post('/', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password, email } = req.body;

    if (
      !firstName ||
      !lastName ||
      !password ||
      !email ||
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      typeof password !== 'string' ||
      typeof email !== 'string'
    ) {
      res.send('Improper Values');
      return;
    }
    const currentUser = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (currentUser.rows[0] === undefined) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.query(
        'INSERT INTO users (first_name, last_name, password, email) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING *',
        [firstName, lastName, hashedPassword, email]
      );
      res.json(newUser.rows[0]);
    } else {
      // TODO: FIND APPROPRIATE STATUS CODE FOR EXISTING USER
      res.json({ message: 'That user already exists' });
    }
    // console.log(req.body);
    // res.send(req.body);
  } catch (error) {
    let message = 'Failed to create New User';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message });
  }
});

// TODO: UPDATING ONE

// TODO: DELETING ONE
export { router as usersRouter };

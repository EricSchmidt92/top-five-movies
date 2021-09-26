import express, { Request, Response } from 'express';
import { Router } from 'express';
import bcrypt from 'bcryptjs';

const router: Router = express.Router();
// import db from '../db';
const db = require('../db');

// GETTING ALL
router.get('/', async (_req: Request, res: Response) => {
  try {
    // const users = await User.find();
    // res.json(users);

    res.send('route for all users');
  } catch (error) {
    let message = 'Failed to get Users';
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500).json({ message });
  }
});

// TODO: GETTING ONE

// CREATING ONE
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

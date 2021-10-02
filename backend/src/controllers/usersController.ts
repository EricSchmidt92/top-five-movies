import { Request, Response } from 'express';
const db = require('../db');
import bcrypt from 'bcryptjs';

export const getCurrentUser = (req: Request, res: Response) => {
  res.send(req.user);
};

export const logInUser = (req: Request, res: Response) => {
  res.send(req.body);
};

export const logInFailed = (req: Request, res: Response) => {
  res.json({ message: 'failure to log in' });
};

export const logInSucceeded = (req: Request, res: Response) => {
  res.json({ message: 'success in logging in', user: req.user });
};

export const logOutUser = (req: Request, res: Response) => {
  req.logout();
  res.send('logging out');
};

export const createUser = async (req: Request, res: Response) => {
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
};

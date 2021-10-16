import bcrypt from 'bcryptjs';
import { PassportStatic } from 'passport';
import passportLocal from 'passport-local';
import { IUser } from '../models/IUser';
// const db = require('../db');
import * as db from '../db';

const LocalStrategy = passportLocal.Strategy;

module.exports = function (passport: PassportStatic) {
  passport.use(
    new LocalStrategy(async (email, password, done) => {
      try {
        const user = await db.getCurrentUser(email);

        if (user.rows[0] === undefined) {
          return done(null, false);
        }

        const userInfo = {
          email: user.rows[0].email,
          password: user.rows[0].password,
        };

        const isValidPass = await bcrypt.compare(password, userInfo.password);
        if (isValidPass === true) {
          return done(null, userInfo);
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.log(error);
        return done(error, null);
      }
    })
  );

  passport.serializeUser((user: any, cb) => {
    cb(null, user.email);
  });

  passport.deserializeUser(async (userEmail: string, cb) => {
    try {
      const user = await db.getCurrentUser(userEmail);
      const { email, id } = user.rows[0];
      const userInfo: IUser = {
        email,
        id,
      };
      cb(null, userInfo);
    } catch (error) {
      console.log(error);
    }
  });
};

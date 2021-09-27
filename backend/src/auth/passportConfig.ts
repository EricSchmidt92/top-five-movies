import bcrypt from 'bcryptjs';
import { PassportStatic } from 'passport';
import passportLocal from 'passport-local';
const db = require('../db');

const LocalStrategy = passportLocal.Strategy;

module.exports = function (passport: PassportStatic) {
  passport.use(
    new LocalStrategy(async (email, password, done) => {
      try {
        const user = await db.query('SELECT * FROM users where email = $1', [
          email,
        ]);

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

  passport.deserializeUser(async (userEmail, cb) => {
    try {
      const user = await db.query('SELECT * FROM users WHERE email = $1', [
        userEmail,
      ]);
      const { email, id } = user.rows[0];
      const userInfo = {
        email,
        id,
      };
      cb(null, userInfo);
    } catch (error) {
      console.log(error);
    }
  });
};

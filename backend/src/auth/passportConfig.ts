import bcrypt from 'bcryptjs';
import { PassportStatic } from 'passport';
import passportLocal from 'passport-local';
const db = require('../db');

const LocalStrategy = passportLocal.Strategy;

module.exports = function (passport: PassportStatic) {
  passport.use(
    new LocalStrategy(async (email, password, done) => {
      try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [
          email,
        ]);
        if (user.rows[0] === undefined) {
          return done(null, false);
        }

        const isValidPass = await bcrypt.compare(
          password,
          user.rows[0].password
        );

        if (isValidPass === true) {
          return done(null, user.rows[0]);
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.log(error);
      }
    })
  );

  //TODO: pick up with serialization on videos
};

import express from 'express';
import { Router } from 'express';
import passport from 'passport';
import * as usersController from './usersController';

const router: Router = express.Router();

// * GET LOGGED IN USER
router.get('/', usersController.getCurrentUser);

// * LOG IN A USER

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/users/fail',
    successRedirect: '/users/success',
  }),
  usersController.logInUser
);

router.get('/fail', usersController.logInFailed);

router.get('/success', usersController.logInSucceeded);

// * LOG OUT A USER
router.get('/logout', usersController.logOutUser);

// * CREATING ONE
router.post('/', usersController.createUser);

// TODO: UPDATING ONE

// TODO: DELETING ONE

// ! ------- some postgresql notes for myself
// this should use the order by in sql.
// look into using a trigger to limit number of rows to 5 for each user
// ALTER TABLE someTable
// ADD UNIQUE (col1, col2) this is possibly a better way than the trigger usage, enforces ranking
// ! -------- end of notes
// ! should have separate routes for inserting rows into user_favorites table (aka first time creating top 5 movies - post request),
// ! otherwise the route will be a put request for updating top 5 movies
export { router as usersRouter };

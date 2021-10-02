import express from 'express';
import { Router } from 'express';

import passport from 'passport';
// import {
//   getCurrentUser,
//   logInUser,
//   logInFailed,
//   logInSucceeded,
//   logOutUser,
// } from '../controllers/usersController';
import * as usersController from '../controllers/usersController';

const router: Router = express.Router();
// import db from '../db';
const db = require('../db');

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
export { router as usersRouter };

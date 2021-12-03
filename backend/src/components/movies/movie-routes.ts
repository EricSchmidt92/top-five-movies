import express from 'express';
import { Router } from 'express';
import * as moviesController from './moviesController';

const router: Router = express.Router();

// GET POPULAR MOVIES
router.get('/', moviesController.getPopularMovies);
router.get('/:movie', moviesController.getMovieQuery);
router.get('/details', moviesController.getOneMovie);
export { router as moviesRouter };

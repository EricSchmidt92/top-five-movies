import express from 'express';
import { Router } from 'express';
import * as moviesController from './moviesController';

const router: Router = express.Router();

// GET POPULAR MOVIES
router.get('/', moviesController.getPopularMovies);
router.get('/data/:movieId', moviesController.getFavoriteDetails);
router.get('/search/:movie', moviesController.getMovieQuery);
export { router as moviesRouter };

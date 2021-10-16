import express from 'express';
import { Router } from 'express';
import * as favoritesController from './favoritesController';

const router: Router = express.Router();

// * CREATING top 5
router.post('/', favoritesController.createFavorites);

// * READING a top 5
router.get('/', favoritesController.getFavorites);

// * UPDATING a top 5
router.put('/', favoritesController.updateFavorites);

export { router as favoritesRouter };

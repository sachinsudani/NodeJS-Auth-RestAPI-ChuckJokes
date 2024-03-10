import express from 'express';
import { getRandomJoke } from '../controllers/chuckNorrisController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getRandomJoke);

export default router;

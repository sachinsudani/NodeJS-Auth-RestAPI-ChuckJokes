import express from 'express';
import { viewProfile } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/me', authMiddleware, viewProfile);

export default router;

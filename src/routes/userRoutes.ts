import express from 'express';
import { logout, viewProfile } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/me', authMiddleware, viewProfile);
router.post('/logout', authMiddleware, logout);

export default router;

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const SECRET_KEY = process.env.JWT_SECRET || 'secret-key';
	const token = req.headers.authorization;
	if (!token) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	const decoded = jwt.verify(token, SECRET_KEY);
	req.body.userId = (decoded as { userId: string }).userId;
	next();
};

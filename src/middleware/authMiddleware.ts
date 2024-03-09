import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const token = req.headers.authorization;
	if (!token) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
		req.body.userId = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Invalid token' });
	}
};

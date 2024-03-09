import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(error.stack);

	if (error.name === 'ValidationError') {
		return res
			.status(400)
			.json({ message: 'Validation error', error: error.message });
	}

	res.status(500).json({ message: 'Internal Server Error' });

	next();
};

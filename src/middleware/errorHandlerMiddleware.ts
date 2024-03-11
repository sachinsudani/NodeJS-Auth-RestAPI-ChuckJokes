import e, { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	console.error(err.stack);

	if (res.headersSent) {
		return next(err);
	}

	let statusCode = 500;
	let errorMessage = 'Internal server error';

	if (err instanceof SyntaxError && 'body' in err) {
		statusCode = 400;
		errorMessage = 'Bad request';
	} else if (err.name === 'JsonWebTokenError') {
		statusCode = 401;
		errorMessage = 'Unauthorized';
	} else if (err.name === 'ValidationError') {
		statusCode = 400;
		errorMessage = 'Validation error';
	}

	res.status(statusCode).json({ error: errorMessage, message: err.message });
};

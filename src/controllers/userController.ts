import { Request, Response } from 'express';
import User from '../models/User';

export const viewProfile = async (
	req: Request,
	res: Response
): Promise<void> => {
	const user = await User.findById(req.body.userId).select('-password');

	res.status(200).json(user);
};

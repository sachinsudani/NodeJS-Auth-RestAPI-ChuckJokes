import { Request, Response } from 'express';
import User from '../models/User';

export const viewProfile = async (
	req: Request,
	res: Response
): Promise<void> => {
	const user = await User.findById(req.body.userId).select('-password');

	if (!user) {
		res.status(404).json({ message: 'User not found' });
		return;
	}

	res.status(200).json(user);
};

export const logout = async (req: Request, res: Response): Promise<void> => {
	res.clearCookie('token');
	res.status(200).json({ message: 'Logged out successfully' });
};

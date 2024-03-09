import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { signupSchema } from '../utils/validation';

export const signup = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password, email } = signupSchema.parse(req.body);

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ username, password: hashedPassword, email });
		await user.save();

		res.status(201).json({ message: 'User Registered Successfully!' });
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
};

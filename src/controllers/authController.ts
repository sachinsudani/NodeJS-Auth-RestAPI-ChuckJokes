import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { loginSchema, signupSchema } from '../utils/validation';

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

export const signup = async (req: Request, res: Response): Promise<void> => {
	const { username, password, email } = signupSchema.parse(req.body);

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new User({ username, password: hashedPassword, email });
	await user.save();

	res.status(201).json({ message: 'User Registered Successfully!' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
	const { username, password } = loginSchema.parse(req.body);

	const user = await User.findOne({ username });
	if (!user) {
		res.status(401).json('User not found with this username!');
		return;
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		res.status(401).json('Invalid credentials!');
	}

	const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
		expiresIn: '1d',
	});

	res.status(200).json({ token });
};

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
import { loginSchema, signupSchema } from '../utils/validation';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'secret-key';

export const signup = async (req: Request, res: Response): Promise<void> => {
	const { username, password, email, role } = signupSchema.parse(req.body);

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new User({ username, password: hashedPassword, email, role });
	await user.save();

	res.status(201).json({ message: 'User Registered Successfully!' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
	const { username, password } = loginSchema.parse(req.body);

	const user = await User.findOne({ username });
	if (!user) {
		res.status(401).json({ message: 'Invalid credential!' });
		return;
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		res.status(401).json({ message: 'Invalid credential!' });
	}

	const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
		expiresIn: '1d',
	});

	res.cookie('token', token, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
	});

	res.status(200).json({ token });
};

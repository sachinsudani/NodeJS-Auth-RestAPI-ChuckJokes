import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
import { loginSchema, signupSchema } from '../utils/validation';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'secret-key';

export const signup = async (req: Request, res: Response) => {
	const { username, password, role } = signupSchema.parse(req.body);

	let user = await User.findOne({ username });
	if (user) {
		return res.status(400).json({ message: 'User already exists' });
	}

	user = new User({ username, password, role });
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(password, salt);
	await user.save();

	res.json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response) => {
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

	const payload = {
		userId: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });

	res.cookie('token', token, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
	});

	res.status(200).json({ token });
};

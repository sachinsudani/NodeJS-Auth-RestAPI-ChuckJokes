import { z } from 'zod';

export const signupSchema = z
	.object({
		username: z
			.string()
			.trim()
			.min(3, { message: 'Username must be at least 3 characters long' }),
		email: z.string().email().optional(),
		password: z
			.string()
			.trim()
			.min(6, { message: 'Password must be at least 6 characters long' }),
		role: z.enum(['USER', 'ADMIN']).optional(),
	})
	.strict();

export const loginSchema = z
	.object({
		username: z.string().trim().min(3),
		password: z.string().trim().min(6),
	})
	.strict();

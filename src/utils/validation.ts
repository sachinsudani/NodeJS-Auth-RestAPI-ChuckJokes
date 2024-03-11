import { z } from 'zod';

export const signupSchema = z
	.object({
		username: z
			.string()
			.min(3, { message: 'Username must be at least 3 characters long' }),
		email: z.string().email().optional(),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters long' }),
		role: z.enum(['USER', 'ADMIN']).optional(),
	})
	.strict();

export const loginSchema = z
	.object({
		username: z.string(),
		password: z.string(),
	})
	.strict();

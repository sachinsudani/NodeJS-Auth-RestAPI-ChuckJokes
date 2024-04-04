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

export const postSchema = z
	.object({
		title: z.string().trim().min(3),
		body: z.string().trim().min(6),
		active: z.boolean().optional(),
		geoLocation: z
			.object({
				type: z.enum(['Point']),
				coordinates: z.array(z.number()).length(2),
			})
			.strict(),
	})
	.strict();

export const updatePostSchema = z
	.object({
		title: z.string().trim().min(3).optional(),
		body: z.string().trim().min(6).optional(),
		active: z.boolean().optional(),
		geoLocation: z
			.object({
				type: z.enum(['Point']),
				coordinates: z.array(z.number()).length(2),
			})
			.strict()
			.optional(),
	})
	.strict();

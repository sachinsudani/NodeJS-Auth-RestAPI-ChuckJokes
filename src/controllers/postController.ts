import { Request, Response } from 'express';
import Post from '../models/Post';
import { postSchema, updatePostSchema } from '../utils/validation';

export const createPost = async (req: Request, res: Response) => {
	const { title, body, geoLocation, active } = postSchema.parse(req.body);

	let createdBy = req.params.userId;

	const newPost = new Post({
		title,
		body,
		createdBy,
		active,
		geoLocation: geoLocation,
	});
	newPost
		.save()
		.then((post) => res.json(post))
		.catch((err) => console.error(err));
};

export const getAllPosts = async (req: Request, res: Response) => {
	let createdBy = req.params.userId;

	console.log(createdBy);
	const posts = await Post.find({ createdBy });
	posts.length > 0
		? res.json(posts)
		: res.status(404).json({ message: 'No posts found' });
};

export const updatePost = async (req: Request, res: Response) => {
	const { title, body, geoLocation, active } = updatePostSchema.parse(req.body);

	const updatedPost = await Post.findByIdAndUpdate(
		{ _id: req.params.id },
		{
			title,
			body,
			active,
			geoLocation: {
				type: 'Point',
				coordinates: geoLocation,
			},
		},
		{ new: true }
	);

	updatedPost
		? res.json(updatedPost)
		: res.status(404).json({ message: 'Post not found' });
};

export const deletePost = async (req: Request, res: Response) => {
	const deletedPost = await Post.findByIdAndDelete({ _id: req.params.id });

	deletedPost
		? res.status(204).send()
		: res.status(404).json({ message: 'Post not found' });
};

export const getPostCounts = async (req: Request, res: Response) => {
	const activeCount = await Post.countDocuments({ active: true });
	const inactiveCount = await Post.countDocuments({ active: false });

	res.json({ activeCount, inactiveCount });
};

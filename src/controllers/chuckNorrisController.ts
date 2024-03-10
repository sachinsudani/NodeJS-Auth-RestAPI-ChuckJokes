import axios from 'axios';
import { Request, Response } from 'express';

export const getRandomJoke = async (
	req: Request,
	res: Response
): Promise<Response<any, Record<string, any>>> => {
	const chuckNorrisApiUrl = 'https://api.chucknorris.io/jokes/random';
	const response = await axios.get(chuckNorrisApiUrl);

	const joke = response.data;

	return res.json(joke);
};

import express from 'express';
import userRoutes from './routes/userRoutes';
// import chuckNorrisRoutes from './routes/chuckNorrisRoutes';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorHandlerMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/user_management');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

app.use('/api/users', userRoutes);
// app.use('/api', chuckNorrisRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
// import chuckNorrisRoutes from './routes/chuckNorrisRoutes';
import { errorHandler } from './middleware/errorHandlerMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
	process.env.MONGODB_URI || 'mongodb://localhost:27017/user_management';

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.json());
app.use('/api/users', authRoutes);
// app.use('/api/users', userRotes);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

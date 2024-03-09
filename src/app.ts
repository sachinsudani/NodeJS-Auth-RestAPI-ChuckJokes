import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import userRoutes from './routes/userRoutes';
// import chuckNorrisRoutes from './routes/chuckNorrisRoutes';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Database Connection
const MONGODB_URI = 'mongodb://localhost:27017/user_management';
mongoose.connect(MONGODB_URI, {
	// useNewUrlParser: true,
	// useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});

// Routes
// app.use('/api/users', userRoutes);
// app.use('/api', chuckNorrisRoutes);

// Global Error Handler
app.use(
	(
		err: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.error(err.stack);
		res.status(500).json({ error: 'Internal Server Error' });
	}
);

// Start Server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

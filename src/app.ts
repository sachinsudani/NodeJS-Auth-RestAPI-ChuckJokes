import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import chuckNorrisRoutes from "./routes/chuckNorrisRoutes";
import { errorMiddleware } from "./middleware/error";
import { errorHandler } from "../errorHandler";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/user_management";

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use("/api/users/auth", errorHandler(authRoutes));
app.use("/api/users", errorHandler(userRoutes));
app.use("/api", errorHandler(postRoutes));
app.use("/api/random-joke", errorHandler(chuckNorrisRoutes));

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
	username: string;
	password: string;
	email: string;
}

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, unique: true },
});

export default mongoose.model<IUser>('User', userSchema);

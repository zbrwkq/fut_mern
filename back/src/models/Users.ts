import mongoose from 'mongoose';
import { Team, TeamSchema } from './Team';

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    team: Team,
}

export const UserSchema = new mongoose.Schema<User>({
    name: String,
    email: String,
    password: String,
    team: TeamSchema,
})

export const UserModel = mongoose.model<User>('User', UserSchema)
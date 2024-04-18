import mongoose from 'mongoose';
import { Team, TeamSchema } from './Team';
import { Role, RoleSchema } from './Role';

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    role: Role,
    team: Team,
}

export const UserSchema = new mongoose.Schema<User>({
    name: String,
    email: String,
    password: String,
    role: RoleSchema,
    team: TeamSchema,
})

export const UserModel = mongoose.model<User>('users', UserSchema)
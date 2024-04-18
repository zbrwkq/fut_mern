import mongoose from 'mongoose';
export default interface User {
    id: number,
    name: string,
    email: string,
    password: string
}

export const UserSchema = new mongoose.Schema<User>({
    name: String,
    email: String,
    password: String
})

export const UserModel = mongoose.model<User>('users', UserSchema)
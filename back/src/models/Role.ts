import mongoose from 'mongoose';

export interface Role {
    id: number,
    name: string,
}

export const RoleSchema = new mongoose.Schema<Role>({
    name: String
})

export const RoleModel = mongoose.model<Role>('roles', RoleSchema)
import mongoose from 'mongoose';
import { Player, PlayerSchema } from './Player';

export interface Team {
    id: number,
    name: string,
    victory: number,
    defeat: number,
    draw: number,
    point: number,
    budget: number,
    players: Player[],
}

export const TeamSchema = new mongoose.Schema<Team>({
    name: String,
    victory: Number,
    defeat: Number,
    draw: Number,
    point: Number,
    budget: Number,
    players: [PlayerSchema],
})

export const TeamModel = mongoose.model<Team>('Teame', TeamSchema)
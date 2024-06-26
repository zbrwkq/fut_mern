import mongoose from 'mongoose';

export interface Player {
    _id: string
    id: number,
    firstName: string,
    lastName: string,
    name: string,
    height: number,
    weight: number,
    gender: string,
    birthDate: Date,
    age: number,
    league: number,
    nation: number,
    club: number,
    rarity: number,
    position: string,
    skillMoves: number,
    weakFoot: number,
    foot: string,
    attackWorkRate: string,
    defenseWorkRate: string,
    totalStats: number,
    totalStatsInGame: number,
    color: string,
    rating: number,
    ratingAverage: number,
    available: boolean
}

export const PlayerSchema = new mongoose.Schema<Player>({
    _id: String,
    id: Number,
    firstName: String,
    lastName: String,
    name: String,
    height: Number,
    weight: Number,
    gender: String,
    birthDate: Date,
    age: Number,
    league: Number,
    nation: Number,
    club: Number,
    rarity: Number,
    position: String,
    skillMoves: Number,
    weakFoot: Number,
    foot: String,
    attackWorkRate: String,
    defenseWorkRate: String,
    totalStats: Number,
    totalStatsInGame: Number,
    color: String,
    rating: Number,
    ratingAverage: Number,
    available: Boolean
})

export const PlayerModel = mongoose.model<Player>('Player', PlayerSchema)

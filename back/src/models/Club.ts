import mongoose from "mongoose";

export interface Club {
    id: number;
    name: string;
}

export const ClubSchema = new mongoose.Schema<Club>({
    id: Number,
    name: String,
});

export const ClubModel = mongoose.model<Club>("Club", ClubSchema);

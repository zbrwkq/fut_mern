"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerModel = exports.PlayerSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.PlayerSchema = new mongoose_1.default.Schema({
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
});
exports.PlayerModel = mongoose_1.default.model('Player', exports.PlayerSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = exports.TeamSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Player_1 = require("./Player");
exports.TeamSchema = new mongoose_1.default.Schema({
    name: String,
    victory: Number,
    defeat: Number,
    draw: Number,
    point: Number,
    budget: Number,
    players: [Player_1.PlayerSchema],
});
exports.TeamModel = mongoose_1.default.model('Team', exports.TeamSchema);

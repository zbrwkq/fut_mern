"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Team_1 = require("./Team");
exports.UserSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
    team: Team_1.TeamSchema,
});
exports.UserModel = mongoose_1.default.model('users', exports.UserSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = exports.EventSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.EventSchema = new mongoose_1.default.Schema({
    name: String,
    date: Date,
});
exports.EventModel = mongoose_1.default.model('Event', exports.EventSchema);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TeamRoutes_1 = __importDefault(require("./routes/TeamRoutes"));
const mongoose = require('mongoose');
const uri = "mongodb+srv://username:eSGvrbLyC5gV2EvY@fut.c5bgtvc.mongodb.net/FUT?retryWrites=true&w=majority&appName=FUT";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(uri);
            yield mongoose.connection.db.admin().command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        catch (error) {
            console.log(error);
        }
    });
}
run().catch(console.dir);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/api/team/", TeamRoutes_1.default);
app.use("/api/player/", PlayerRoutes);
app.use("/api/event/", EventRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

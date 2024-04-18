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
const express_1 = require("express");
const User_1 = require("../models/User");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
const UserModel = mongoose_1.default.model("users", User_1.UserSchema);
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }
        res.status(200).json({ message: "Connexion réussie.", user });
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Erreur lors de la connexion." });
    }
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield UserModel.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Cet utilisateur existe déjà." });
        }
        const newUser = new UserModel({ email, password });
        yield newUser.save();
        const userWithoutPassword = {
            email: newUser.email,
            _id: newUser._id,
        };
        res.status(201).json({
            message: "Inscription réussie.",
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ message: "Erreur lors de l'inscription." });
    }
}));
router.get('/', (req, res) => {
    const query = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield UserModel.find({});
            res.status(200).send(users);
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error when getting users");
        }
    });
    query();
});
router.get('/:id', (req, res) => {
    const query = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield UserModel.findById(req.params.id);
            res.status(200).send(user);
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error when getting user");
        }
    });
    query();
});
router.post('/', (req, res) => {
    const query = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield UserModel.create(req.body);
            res.status(200).send("User created");
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error when inserting user");
        }
    });
    query();
});
router.put('/:id', (req, res) => {
    const query = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield UserModel.findByIdAndUpdate(req.params.id, req.body);
            if (!user) {
                res.status(404).send("User not found");
            }
            res.status(200).send("User updated");
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error when updating user");
        }
    });
    query();
});
router.delete('/:id', (req, res) => {
    const query = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield UserModel.findByIdAndDelete(req.params.id);
            if (!user) {
                res.status(404).send("User not found");
            }
            res.status(200).send("User deleted");
        }
        catch (error) {
            console.log(error);
        }
    });
    query();
});
exports.default = router;

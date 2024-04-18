import { Router, Request, Response } from "express";
import { User, UserSchema } from "../models/Users";
import mongoose from "mongoose";

const router = Router();

const userModel = mongoose.model<User>("users", UserSchema);

router.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        res.status(200).json({ message: "Connexion réussie.", user });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Erreur lors de la connexion." });
    }
});

router.post("/register", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Cet utilisateur existe déjà." });
        } 

        const newUser = new userModel({ email, password });
        await newUser.save();

        const userWithoutPassword = {
            email: newUser.email,
            _id: newUser._id,
        };

        res.status(201).json({
            message: "Inscription réussie.",
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({ message: "Erreur lors de l'inscription." });
    }
});


export default router;

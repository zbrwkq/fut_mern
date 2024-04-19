import { Router, Request, Response } from "express";
import { User, UserSchema } from "../models/User";
import mongoose from "mongoose";
import { RoleModel } from "../models/Role";

const router = Router();

const UserModel = mongoose.model<User>("users", UserSchema);

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

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
    const { email, password, role } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà." });
    }

    let existingRole = await RoleModel.findOne({ name: role.name });

    if (!existingRole) {
      existingRole = new RoleModel(role);
      await existingRole.save();
    }

    const newUser = new UserModel({ email, password, role: existingRole });
    await newUser.save();

    res.status(201).json({ message: "Inscription réussie.", user: newUser });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
});

router.get("/", (req: Request, res: Response) => {
  const query = async () => {
    try {
      const users = await UserModel.find({});
      res.status(200).send(users);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error when getting users");
    }
  };
  query();
});

router.get("/:id", (req: Request, res: Response) => {
  const query = async () => {
    try {
      const user = await UserModel.findById(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error when getting user");
    }
  };
  query();
});

router.post("/", (req: Request, res: Response) => {
  const query = async () => {
    try {
      await UserModel.create(req.body);
      res.status(200).send("User created");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error when inserting user");
    }
  };
  query();
});

router.put("/:id", (req: Request, res: Response) => {
  const query = async () => {
    try {
      const user = await UserModel.findByIdAndUpdate(req.params.id, req.body);
      if (!user) {
        res.status(404).send("User not found");
      }
      res.status(200).send("User updated");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error when updating user");
    }
  };
  query();
});

router.delete("/:id", (req: Request, res: Response) => {
  const query = async () => {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404).send("User not found");
      }
      res.status(200).send("User deleted");
    } catch (error) {
      console.log(error);
    }
  };
  query();
});

export default router;

import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { Club, ClubSchema } from "../models/Club";

const router = Router();

const ClubModel = mongoose.model<Club>("clubs", ClubSchema);

router.get("/", (req: Request, res: Response) => {
    const query = async () => {
        try {
            const clubs = await ClubModel.find({});
            res.status(200).send(clubs);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error when getting club");
        }
    };
    query();
});

router.get("/:id", (req: Request, res: Response) => {
    const query = async () => {
        try {
            const club = await ClubModel.findOne({ id: req.params.id });
            res.status(200).send(club);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error when getting club");
        }
    };
    query();
});

export default router;

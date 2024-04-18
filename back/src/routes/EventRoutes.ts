import { Router, Response, Request } from "express";
import { EventModel } from "../models/Event";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    const query = async () => {
        try {
            let result = await EventModel.find({});
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error while getting documents");
        }
    };
    query();
});

router.get("/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Invalid id");
    } else {
        const query = async () => {
            try {
                let result = await EventModel.findById(id).exec();
                if (!result) {
                    res.status(404).send("Event not foud");
                } else {
                    res.status(200).send(result);
                }
            } catch (error) {
                console.log(error);
                res.status(500).send("Error while getting document");
            }
        };
        query();
    }
});

router.post("/", (req: Request, res: Response) => {
    let document = new EventModel(req.body);
    const query = async () => {
        try {
            let result = await document.save();
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error while saving document");
        }
    };
    query();
});

router.put("/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        res.send("Invalid id");
    } else {
        const query = async () => {
            try {
                const result = await EventModel.findByIdAndUpdate(
                    id,
                    {
                        name: req.body.name,
                        birthDate: req.body.birthDate,
                        biography: req.body.biography,
                    },
                    {
                        returnDocument: "after",
                    }
                );
                if (!result) {
                    res.status(404).send("Event not foud");
                } else {
                    res.status(200).send(result);
                }
            } catch (error) {
                console.log(error);
                res.status(500).send("Error while updating document");
            }
        };
        query();
    }
});

router.delete("/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        res.status(400);
        res.send("Invalid id");
    } else {
        const query = async () => {
            try {
                const result = await EventModel.findByIdAndDelete(id);
                if (!result) {
                    res.status(404).send("Event not foud");
                } else {
                    res.status(200).send(result);
                }
            } catch (error) {
                console.log(error);
                res.status(500).send("Error while updating document");
            }
        };
        query();
    }
});

export default router;

import { Router, Response, Request } from "express";
import { PlayerModel } from "../models/Player";

const router = Router();

router.get("/", (req: Request, res: Response) => {

    const query = async () => {
        try {
            let result = await PlayerModel.find({});
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error while getting documents");
        }
    };
    query();
});

router.get("/", (req: Request, res: Response) => {
    const query = async () => {
        try {
            let { page, available } = req.query;

            if (page && typeof page === 'string') {
                const offset = (parseInt(page) - 1) * 20;
                let players = await PlayerModel.find(available ? { available: available } : {}).limit(20).skip(offset);
                res.status(200).send(players);
            }

            let players = await PlayerModel.find({});
            res.status(200).send(players);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error while getting documents");
        }
    }
    query();
})

router.get("/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send("Invalid id");
    } else {
        const query = async () => {
            try {
                let result = await PlayerModel.findById(id).exec();
                if (!result) {
                    res.status(404).send("Player not foud");
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
    let document = new PlayerModel(req.body);
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
                const result = await PlayerModel.findByIdAndUpdate(
                    id,
                    req.body,
                    {
                        returnDocument: "after",
                    }
                );
                if (!result) {
                    res.status(404).send("Player not foud");
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
                const result = await PlayerModel.findByIdAndDelete(id);
                if (!result) {
                    res.status(404).send("Player not foud");
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

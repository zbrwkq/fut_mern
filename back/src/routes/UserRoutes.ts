import { Router, Response, Request } from "express";
import { UserModel } from "../models/Users";

const router = Router();

// CRUD USER    
router.get('/', (req: Request, res: Response) => {
    const query = async () => {
        try {
            const users = await UserModel.find({});
            res.status(200).send(users)
        } catch(error) {
            console.log(error);
            res.status(500).send("Error when getting users")
        }
    }
    query()
})

router.get('/:id', (req: Request, res: Response) => {
    const query = async () => {
        try {
            const user = await UserModel.findById(req.params.id);
            res.status(200).send(user)
        } catch(error) {
            console.log(error);
            res.status(500).send("Error when getting user")
        }
    }
    query()
})

router.post('/', (req: Request, res: Response) => {
    const query = async () => {
        try {
            await UserModel.create(req.body);
            res.status(200).send("User created")
        } catch(error) {
            console.log(error);
            res.status(500).send("Error when inserting user")
        }
    }
    query()
})

router.put('/:id', (req: Request, res: Response) => {
    const query = async () => {
        try {
            const user = await UserModel.findByIdAndUpdate(req.params.id, req.body);
            if (!user) {
                res.status(404).send("User not found")
            }
            res.status(200).send("User updated")
        } catch(error) {
            console.log(error);
            res.status(500).send("Error when updating user")
        }
    }
    query()
})

router.delete('/:id', (req: Request, res: Response) => {
    const query = async () => {
        try {
            const user = await UserModel.findByIdAndDelete(req.params.id);
            if (!user) {
                res.status(404).send("User not found")
            }
            res.status(200).send("User deleted")
        } catch(error) {
            console.log(error);
        }
    }
    query()
})

export default router;
import express, { Express } from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";

const uri =
    "mongodb+srv://username:eSGvrbLyC5gV2EvY@fut.c5bgtvc.mongodb.net/FUT?retryWrites=true&w=majority&appName=FUT";

async function run() {
    try {
        await mongoose.connect(uri);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } catch (err) {
        console.log(err);
    }
}
run().catch(console.dir);

const app: Express = express();

const PORT = 3000;

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

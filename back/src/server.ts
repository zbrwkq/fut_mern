import express from "express";
import TeamRoutes from "./routes/TeamRoutes";
import PlayerRoutes from "./routes/PlayerRoutes";
import EventRoutes from "./routes/EventRoutes";
import UserRoutes from "./routes/UserRoutes";
// TODO revoir la connexion mongoose

const mongoose = require('mongoose');
const uri = "mongodb+srv://username:eSGvrbLyC5gV2EvY@fut.c5bgtvc.mongodb.net/FUT?retryWrites=true&w=majority&appName=FUT";

async function run() {
  try {
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error: any) {
    console.log(error)
  }
}
run().catch(console.dir);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/team/", TeamRoutes);
app.use("/api/player/", PlayerRoutes);
app.use("/api/event/", EventRoutes);
app.use("/api/users", UserRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

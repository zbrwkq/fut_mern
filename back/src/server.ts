import express from "express";
import TeamRoutes from "./routes/TeamRoutes";
// TODO revoir la connexion mongoose

const mongoose = require('mongoose');
const uri = "mongodb+srv://username:eSGvrbLyC5gV2EvY@fut.c5bgtvc.mongodb.net/?retryWrites=true&w=majority&appName=FUT";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error: any) {
    console.log(error)
    await mongoose.disconnect();
  }
}
run().catch(console.dir);



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/team/", TeamRoutes);
app.use("/api/player/", PlayerRoutes);
app.use("/api/event/", EventRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

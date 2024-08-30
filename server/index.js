import express, { json } from "express";
import "dotenv/config.js";
import mainRouter from "./routes/main.js";
import { dbConnect } from "./config/dbConfig.js";
import cors from "cors";
const app = express();
dbConnect();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(mainRouter);

app.listen(process.env.PORT, () => {
  console.log(`server running in port ${process.env.PORT}`);
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from "./routes/index.js";

dotenv.config();

const app = express();
const {PORT, DATABASE} = process.env;

mongoose.connect(DATABASE, () => console.log("Database connencted"));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router)
 
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});
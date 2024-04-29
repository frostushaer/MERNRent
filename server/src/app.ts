import express from 'express';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';
import NodeCache from 'node-cache';
import {config} from "dotenv";
import morgan from "morgan";

// importing routes 
import userRoute from './routes/user.js';
import productRoute from './routes/product.js';

config({
    path:"./.env",
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";

connectDB(mongoURI);

export const myCache = new NodeCache();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res)=> {
    res.send("API working");
});

// using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);

app.use("/uploads", express.static("uploads"));

app.use(errorMiddleware);

app.listen(port, ()=> {
    console.log(`Server is working on http://localhost:${port}`);
    
});
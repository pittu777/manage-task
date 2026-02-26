import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/auth.routes";
import { connectDB } from "./config/db";
import { globelErrorHandler } from "./middleware/errorMiddleware";




const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use(globelErrorHandler);

export default app;

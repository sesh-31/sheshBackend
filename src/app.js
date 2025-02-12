import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";  // Make sure this is correctly imported
import { registerUser } from "./controller/user.controller.js";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// Ensure the routes are correctly registered
// app.use("/api/v1/users", userRouter);
app.post("/api/v1/users/register", registerUser);
 app.get("/", (req, res)=> {
    res.json({message: "Hello World!"});
 })

export default app;

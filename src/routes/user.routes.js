import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";

const router = Router();

router.post("/register", registerUser);  // Route to register a user

export default router;

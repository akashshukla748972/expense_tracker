import express from "express";
import { handleRegisterUser } from "../controllers/auth/auth.controller.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { registerSchema } from "../models/user/registerSchema.js";

const router = express.Router();

router.post("/register", validateMiddleware(registerSchema), handleRegisterUser);

export default router;

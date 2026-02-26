import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";

import { loginSchema, registerSchema } from "@/validators/auth.validator";
import { validate } from "@/middleware/validate";




const router = Router();

router.post("/signup", validate(registerSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;
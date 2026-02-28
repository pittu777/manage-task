
import { createWorkspace } from "@/controllers/workspace.controller";
import { protect } from "@/middleware/auth.middleware";
import { Router } from "express";




const router = Router();

router.post("/", protect, createWorkspace);


export default router;
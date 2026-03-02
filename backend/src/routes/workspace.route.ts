
import { createWorkspace, getWorkSpaces } from "@/controllers/workspace.controller";
import { protect } from "@/middleware/auth.middleware";
import { Router } from "express";




const router = Router();

router.post("/", protect, createWorkspace);
router.get("/", protect, getWorkSpaces);


export default router;
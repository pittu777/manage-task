

import { createBoard } from "@/controllers/board.controller";
import { protect } from "@/middleware/auth.middleware";
import { Router } from "express";


const router = Router();

router.post("/:workSpaceId/boards", protect, createBoard);

export default router;
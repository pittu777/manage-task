

import { createBoard, getBoardsOfWorkSpace } from "@/controllers/board.controller";
import { protect } from "@/middleware/auth.middleware";
import { Router } from "express";


const router = Router();

router.post("/:workSpaceId/boards", protect, createBoard);
router.get("/:workSpaceId/boards", protect, getBoardsOfWorkSpace);

export default router;
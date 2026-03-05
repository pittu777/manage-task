import { NextFunction, Request, Response } from "express";
import * as boardService from "./../services/board.service";
import { AppError } from "@/utils/AppError";

type Params = {
    workSpaceId: string;
};

export const createBoard = async (req: Request<Params>, res: Response, next: NextFunction) => {
    try {

        const { workSpaceId } = req.params;
        const { name } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            throw new AppError("Unauthorized", 404);
        }

        const board = await boardService.createBoard(workSpaceId, name, userId);

        res.status(201).json({
            status: "success",
            data: board,
        });


    } catch (error) {
        next(error);
    }
}

export const getBoardsOfWorkSpace = async (req: Request<Params>, res: Response, next: NextFunction) => {
    try {
        const { workSpaceId } = req.params;
        const userId = req.user?.id;
        if (!userId) {
            throw new AppError("Unauthorized", 404);
        }
        const borads = await boardService.getBoards(workSpaceId, userId);

        res.status(200).json({
            status: "success",
            data: borads,
        })
    } catch (err) {
        next(err);
    }
}
import { NextFunction, Request, Response } from "express";
import * as workSpaceService from "./../services/workspace.service";
import { AppError } from "@/utils/AppError";



export const createWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new AppError("Not authorized", 401);
        }

        // we need to take user like this instead of req.body.id (don't take id from body)
        const name = req.body.name;
        const userId = req.user.id;

        const workspace = await workSpaceService.createWorkSpace(name, userId);

        res.status(201).json({
            status: "success",
            data: workspace
        });

    } catch (err) {
        next(err);
    }
}

import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";
import UserModel from "src/models/User.model";
export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer")) {
            return next(new AppError("Please log in to get access", 401));
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

        const currentUser = await UserModel.findById(decoded.id).select("-password");

        if (!currentUser) {
            return next(new AppError("The user belonging to this token no longer exists.", 401));
        }


        req.user = {
            id: currentUser._id.toString(),
            role: currentUser.role,
            email: currentUser.email
        };

        next();
    } catch (err) {
        next(new AppError("Invalid token", 401));
    }
};
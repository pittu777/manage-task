import { Request, Response, NextFunction } from "express";
import * as authService from "./../services/auth.service";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token, user } = await authService.signUpUser(req.body);

        res.status(201).json({
            status: "success",
            token,
            data: { user }
        });
    } catch (err) {
        next(err);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.loginUser({ email, password });

        res.status(200).json({
            status: "success",
            token,
            data: { user }
        });
    } catch (err) {
        next(err);
    }
};
import { Request, Response, NextFunction } from "express";


export const globelErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        res.status(err.statusCode).json({
            status: err.status,
            err: err,
            message: err.message,
            stack: err.stack
        });

    } else {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.isOperational ? err.message : 'Something went very wrong!'
        });
    }
}
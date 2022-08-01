import { NextFunction, Request, Response } from "express"

import { logger } from "@src/utils"
import { HttpException } from "@src/exceptions"

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number  = error.httpCode || 500
        const message: string = error.message || "Something went wrong"

        logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`)
        res.status(status).json(error.toJSON())
    } catch (error) {
        next(error)
    }
}

import { NextFunction, Request, Response } from "express"

import { logger, isAxiosError } from "@src/utils"
import { HttpException } from "@src/exceptions"

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number  = error.httpCode || 500
        const message: string = error.message || "Something went wrong"
        if (isAxiosError(error)) {
            logger.debug("is axios error")
            logger.debug(error.response.data)
        }

        logger.error({
            method: req.method,
            path: req.path,
            status: status,
            message: message,
        })
        res.status(status).json(error.toJSON())
    } catch (error) {
        next(error)
    }
}

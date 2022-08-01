import { NextFunction, Request, Response } from "express"

import { logger } from "@src/utils"

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!res.status) {
        logger.info(`404 handled: '${req.url}'`)
        res.status(404).send({ message: "Not Found" })
    } else {
        next()
    }
}

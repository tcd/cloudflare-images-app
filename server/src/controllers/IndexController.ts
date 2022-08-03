import { StatusCodes } from "http-status-codes"

import { sleep } from "@src/util"
import { Req, Res, Next } from "@src/types"

export abstract class IndexController {

    // @Get("/")
    // @Get("/api")
    // @Get("/api/cloudflare")
    // @Get("/api/cloudflare/images")
    // @Get("/api/cloudflare/variants")
    public static async index(req: Req<unknown>, res: Res, next: Next): Promise<void> {
        try {
            res.status(StatusCodes.OK)
            res.json({ message: "Okay" })
        } catch (error) {
            next(error)
        }
    }

    public static async testing(_req: Req<unknown>, res: Res, _next: Next): Promise<void> {
        await sleep(2_000)
        throw new Error("oh no!")
        res.status(StatusCodes.OK)
        res.json({ message: "Okay" })
    }

}

import { CloudflareClient } from "cloudflare-images"
import { StatusCodes } from "http-status-codes"

import { Req, Res, Next } from "@src/types"
import { isBlank, logger } from "@src/util"
import {
    IdRequest,
    ListImagesRequest,
} from "@src/dtos"

// @Controller("/api/cloudflare/images")
export class ImagesController {

    // @Post("/list")
    // @HttpCode(200)
    // @UseBefore(validationMiddleware(ListImagesRequest, "body"))
    public static async listImages(req: Req<ListImagesRequest>, res: Res, _next: Next) {
        const client = new CloudflareClient(req.body.credentials)
        const response = await client.listImages(req.body.options)
        res.status(StatusCodes.OK).json(response)
    }

    // @Post("/get")
    public static async getImage(req: Req<IdRequest>, res: Res, _next: Next) {
        const client = new CloudflareClient(req.body.credentials)
        const response = await client.getImage(req.body.id)
        res.status(StatusCodes.OK).json(response)
    }

    // @Post("/create")
    public static async createImage(req: Req<any>, res: Res, _next: Next) {
        const data: any = {
            "content-type": req.headers["content-type"],
            "body": req.body,
        }
        debugger
        logger.info(data)
        // const response = JSON.stringify(request)
        // logger.info(JSON.stringify(request.body))
        // const client = new CloudflareClient(request.credentials)
        // const response = await client.createImage({ })
        res.status(StatusCodes.CREATED).json(data)
    }

    // @Post("/delete")
    public static async deleteImage(req: Req<IdRequest>, res: Res, _next: Next) {
        const client = new CloudflareClient(req.body.credentials)
        const response = await client.deleteImage(req.body.id)
        res.status(StatusCodes.OK).json(response)
    }
}

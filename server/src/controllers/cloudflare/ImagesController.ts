import Cloudflare, { CloudflareClient } from "cloudflare-images"
import { StatusCodes } from "http-status-codes"

import { Req, Res, Next } from "@src/types"
import { isBlank, logger } from "@src/util"
import {
    CreateImageRequest,
    IdRequest,
    ListImagesRequest,
} from "@src/dtos"
import { createReadStream } from "fs"

// @Controller("/api/cloudflare/images")
export class ImagesController {

    // @Post("/list")
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
    public static async createImage(req: Req<CreateImageRequest>, res: Res, _next: Next) {
        const file = req.files?.[0]
        if (isBlank(file)) {
            res
                .status(StatusCodes.UNPROCESSABLE_ENTITY)
                .json({
                    message: "file data is required",
                    errors: { "fileData": [ "required" ] },
                })
            return
        }
        const {
            apiKey,
            accountId,
            ...options
        } = req.body
        const credentials = { apiKey, accountId }

        const client = new CloudflareClient(credentials)
        const response = await client.createImageFromFile(options, file.path)
        res.status(StatusCodes.CREATED).json(response)
    }

    // @Post("/delete")
    public static async deleteImage(req: Req<IdRequest>, res: Res, _next: Next) {
        const client = new CloudflareClient(req.body.credentials)
        const response = await client.deleteImage(req.body.id)
        res.status(StatusCodes.OK).json(response)
    }
}

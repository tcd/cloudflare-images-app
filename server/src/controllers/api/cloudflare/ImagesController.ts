import { Body, Controller, HttpCode, Post, UseBefore } from "routing-controllers"
import { CloudflareClient } from "cloudflare-images"

import { logger } from "@src/utils"
import { validationMiddleware } from "@src/middleware"
import {
    IdRequest,
    ListImagesRequest,
} from "@src/dtos"

@Controller("/api/cloudflare/images")
export class ImagesController {

    @Post("/list")
    @HttpCode(200)
    @UseBefore(validationMiddleware(ListImagesRequest, "body"))
    public async listImages(@Body() request: ListImagesRequest) {
        const client = new CloudflareClient(request.credentials)
        const response = await client.listImages(request.options)
        return response
    }

    @Post("/get")
    @HttpCode(200)
    @UseBefore(validationMiddleware(IdRequest, "body"))
    public async getImage(@Body() request: IdRequest) {
        const client = new CloudflareClient(request.credentials)
        const response = await client.getImage(request.id)
        return response
    }

    @Post("/create")
    @HttpCode(201)
    // @UseBefore(validationMiddleware(IdRequest, "body"))
    public async createImage(request: any) {
        logger.info(JSON.stringify(request))
        // const client = new CloudflareClient(request.credentials)
        // const response = await client.createImage({ })
        return { message: "testing" }
    }

    @Post("/delete")
    @HttpCode(200)
    @UseBefore(validationMiddleware(IdRequest, "body"))
    public async deleteImage(@Body() request: IdRequest) {
        const client = new CloudflareClient(request.credentials)
        const response = await client.deleteImage(request.id)
        return response
    }
}

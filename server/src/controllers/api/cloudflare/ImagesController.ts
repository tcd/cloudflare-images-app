import { Body, Controller, HttpCode, Post, UseBefore } from "routing-controllers"
import { CloudflareClient } from "cloudflare-images"

import { validationMiddleware } from "@src/middleware"
import { ListImagesRequest } from "@src/dtos/ListImagesRequest"

@Controller("/api/cloudflare/images")
export class ImagesController {

    @Post("/")
    @HttpCode(200)
    @UseBefore(validationMiddleware(ListImagesRequest, "body"))
    public async listImages(@Body() request: ListImagesRequest) {
        const client = new CloudflareClient(request.credentials)
        const response = await client.listImages(request.options)
        return response
    }
}

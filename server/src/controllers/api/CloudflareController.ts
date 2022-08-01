import { Body, Controller, Get, HttpCode, Post, UseBefore } from "routing-controllers"
import { CloudflareClient } from "cloudflare-images"

import { CredentialsRequest } from "@src/dtos"
import { validationMiddleware } from "@src/middleware"
import { ListImagesRequest } from "@src/dtos/ListImagesRequest"

@Controller("/api/cloudflare")
export class CloudflareController {

    @Get("/")
    @HttpCode(200)
    public index() {
        return "OK"
    }

    @Post("/usage")
    @HttpCode(200)
    @UseBefore(validationMiddleware(CredentialsRequest, "body"))
    public async getUsageStatistics(@Body() request: CredentialsRequest) {
        const client = new CloudflareClient(request.credentials)
        const usage = await client.getStats()
        return usage
    }

    @Post("/variants")
    @HttpCode(200)
    @UseBefore(validationMiddleware(CredentialsRequest, "body"))
    public async listVariants(@Body() request: CredentialsRequest) {
        const client = new CloudflareClient(request.credentials)
        const response = await client.listVariants()
        return response
    }

    @Post("/images")
    @HttpCode(200)
    @UseBefore(validationMiddleware(ListImagesRequest, "body"))
    public async listImages(@Body() request: ListImagesRequest) {
        const client = new CloudflareClient(request.credentials)
        const response = await client.listImages(request.options)
        return response
    }

}

import { Body, Controller, HttpCode, Post, UseBefore } from "routing-controllers"
import { CloudflareClient } from "cloudflare-images"

import {
    CreateVariantRequest,
    CredentialsRequest,
    IdRequest,
    UpdateVariantRequest,
} from "@src/dtos"
import { validationMiddleware } from "@src/middleware"

@Controller("/api/cloudflare/variants")
export class VariantsController {

    @Post("/list")
    @HttpCode(200)
    @UseBefore(validationMiddleware(CredentialsRequest, "body"))
    public async listVariants(@Body() request: CredentialsRequest) {
        const client = new CloudflareClient(request.credentials)
        const response = await client.listVariants()
        return response
    }

    @Post("/get")
    @HttpCode(200)
    @UseBefore(validationMiddleware(IdRequest, "body"))
    public async getVariant(@Body() request: IdRequest) {
        const client = new CloudflareClient(request.credentials)
        const response = await client.getVariant(request.id)
        return response
    }

    @Post("/create")
    @HttpCode(200)
    @UseBefore(validationMiddleware(CreateVariantRequest, "body"))
    public async createVariant(@Body() request: CreateVariantRequest) {
        const client = new CloudflareClient(request.credentials)
        const response = await client.createVariant(request.options)
        return response
    }

    @Post("/update")
    @HttpCode(200)
    @UseBefore(validationMiddleware(UpdateVariantRequest, "body"))
    public async updateVariant(@Body() request: UpdateVariantRequest) {
        const client = new CloudflareClient(request.credentials)
        const response = await client.updateVariant(request.id, request.options)
        return response
    }

    @Post("/delete")
    @HttpCode(200)
    @UseBefore(validationMiddleware(IdRequest, "body"))
    public async deleteVariant(@Body() request: IdRequest) {
        const client = new CloudflareClient(request.credentials)
        const response = await client.deleteVariant(request.id)
        return response
    }
}

import { Body, Controller, HttpCode, Post, UseBefore } from "routing-controllers"
import { CloudflareClient } from "cloudflare-images"

import { validationMiddleware } from "@src/middleware"
import { CredentialsRequest } from "@src/dtos"

@Controller("/api/cloudflare/usage")
export class UsageController {

    @Post("/")
    @HttpCode(200)
    @UseBefore(validationMiddleware(CredentialsRequest, "body"))
    public async getUsageStatistics(@Body() request: CredentialsRequest) {
        const client = new CloudflareClient(request.credentials)
        const usage = await client.getStats()
        return usage
    }
}

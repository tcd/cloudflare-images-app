import { CloudflareClient } from "cloudflare-images"
import { StatusCodes } from "http-status-codes"

import { Req, Res, Next } from "@src/types"
import {
    CreateVariantRequest,
    CredentialsRequest,
    IdRequest,
    UpdateVariantRequest,
} from "@src/dtos"

// @Controller("/api/cloudflare/variants")
export abstract class VariantsController {

    // @Post("/list")
    public static async listVariants(req: Req<CredentialsRequest>, res: Res, _next: Next) {
        const client = new CloudflareClient(req.body.credentials)
        const response = await client.listVariants()
        res.status(StatusCodes.OK).json(response)
    }

    // @Post("/get")
    public static async getVariant(req: Req<IdRequest>, res: Res, _next: Next) {
        const client = new CloudflareClient(req.body.credentials)
        const response = await client.getVariant(req.body.id)
        res.status(StatusCodes.OK).json(response)
    }

    // @Post("/create")
    public static async createVariant(req: Req<CreateVariantRequest>, res: Res, _next: Next) {
        const client = new CloudflareClient(req.body.credentials)
        const response = await client.createVariant(req.body.options)
        res.status(StatusCodes.CREATED).json(response)
    }

    // @Post("/update")
    public static async updateVariant(req: Req<UpdateVariantRequest>, res: Res, _next: Next) {
        const client = new CloudflareClient(req.body.credentials)
        const response = await client.updateVariant(req.body.id, req.body.options)
        res.status(StatusCodes.OK).json(response)
    }

    // @Post("/delete")
    public static async deleteVariant(req: Req<IdRequest>, res: Res, _next: Next) {
        const client = new CloudflareClient(req.body.credentials)
        const response = await client.deleteVariant(req.body.id)
        res.status(StatusCodes.OK).json(response)
    }
}

import { CloudflareClient } from "cloudflare-images"
import { StatusCodes } from "http-status-codes"

// import { validationMiddleware } from "@src/middleware"
import { CredentialsRequest } from "@src/dtos"
import { Req, Res, Next } from "@src/types"

export abstract class UsageController {

    public static async getUsageStatistics(req: Req<CredentialsRequest>, res: Res, next: Next): Promise<void> {
        try {
            const client = new CloudflareClient(req.body.credentials)
            const usage = await client.getStats()
            res.status(StatusCodes.OK)
            res.json(usage)
        } catch (error) {
            next(error)
        }
    }
}

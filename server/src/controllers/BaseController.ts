import { Req, Res, Next } from "@src/types"

export type AsyncRouteHandler<ReqBody> = (req: Req<ReqBody>, res: Res, next: Next) => Promise<void>

export abstract class BaseController {

    public async handle<ReqBody>(req: Req<ReqBody>, res: Res, next: Next, handler: AsyncRouteHandler<ReqBody>): Promise<void> {
        try {
            await handler(req, res, next)
        } catch (error) {
            next(error)
        }
    }

}

import { Req, Res, Next } from "@src/types"

export type AsyncRouteHandler<ReqBody = any> = (req: Req<ReqBody>, res: Res, next: Next) => Promise<void>

export interface IRouteData {
    method: "GET" | "POST"
    route: string
    handler: AsyncRouteHandler
}

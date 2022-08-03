import {
    ParamsDictionary as CoreParamsDictionary,
    Query as CoreQuery,
    Request as CoreRequest,
} from "express-serve-static-core"
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction as ExpressNextFunction,
} from "express"

// interface Request<
//     P = CoreParamsDictionary,
//     ResBody = any,
//     ReqBody = any,
//     ReqQuery = CoreQuery,
//     Locals extends Record<string, any> = Record<string, any>
// > extends CoreRequest<P, ResBody, ReqBody, ReqQuery, Locals> {}

export type Req<ReqBody> = ExpressRequest<CoreParamsDictionary, any, ReqBody>
export type Res<ResBody = any> = ExpressResponse<ResBody>
export type Next = ExpressNextFunction

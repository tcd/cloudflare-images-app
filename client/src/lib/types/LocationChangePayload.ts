import type { Location } from "react-router-dom"

export type PathParamValue =
    | "variantId"
    | "imageId"

export type IPathParams = Partial<Record<PathParamValue, string>>;

export interface LocationChangePayload {
    pathParams: IPathParams
    location: Location
    previousLocation?: Location
}

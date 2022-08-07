import { Location } from "react-router-dom"

export const PathParamValues = {
    variantId: "variantId",
    imageId:   "imageId",
} as const
type PathParamValuesKey = keyof typeof PathParamValues
export type PathParamValue = typeof PathParamValues[PathParamValuesKey]

export type IPathParams = Partial<Record<PathParamValue, string>>;

export interface LocationChangePayload {
    pathParams: IPathParams
    location: Location
    previousLocation?: Location
}

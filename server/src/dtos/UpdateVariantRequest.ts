import { IsNotEmptyObject } from "class-validator"
import Cloudflare from "cloudflare-images"

import { IsNotBlank } from "@src/utils"
import { IdRequest } from "./IdRequest"

export class UpdateVariantRequest extends IdRequest {
    @IsNotBlank()
    @IsNotEmptyObject()
    public options: Cloudflare.Requests.CreateVariant
}

import { IsNotEmptyObject } from "class-validator"
import Cloudflare from "cloudflare-images"

import { IsNotBlank } from "@src/util"
import { IdRequest } from "./IdRequest"

export class UpdateImageRequest extends IdRequest {
    @IsNotBlank()
    @IsNotEmptyObject()
    public options: Cloudflare.Requests.UpdateImage
}

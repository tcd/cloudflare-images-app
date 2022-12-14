import { IsNotEmptyObject } from "class-validator"
import Cloudflare from "cloudflare-images"

import { IsNotBlank } from "@src/utils"
import { CredentialsRequest } from "./CredentialsRequest"

export class CreateVariantRequest extends CredentialsRequest {
    @IsNotBlank()
    @IsNotEmptyObject()
    public options: Cloudflare.Requests.CreateVariant
}

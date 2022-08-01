import { Requests } from "cloudflare-images"
import { IsNotEmptyObject } from "class-validator"

import { CredentialsRequest } from "./CredentialsRequest"

export class ListImagesRequest extends CredentialsRequest {
    @IsNotEmptyObject()
    public options?: Requests.ListImages
}

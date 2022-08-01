import { IsString } from "class-validator"

import { IsNotBlank } from "@src/utils"
import { CredentialsRequest } from "./CredentialsRequest"

export class IdRequest extends CredentialsRequest {
    @IsString()
    @IsNotBlank()
    public id: string
}

import { IsString } from "class-validator"

import { IsNotBlank } from "@src/util"
import { CredentialsRequest } from "./CredentialsRequest"

export class IdRequest extends CredentialsRequest {
    @IsString()
    @IsNotBlank()
    public id: string
}

import { ValidateNested } from "class-validator"

import { Credentials } from "./Credentials"

export class CredentialsRequest {
    @ValidateNested()
    public credentials: Credentials
}

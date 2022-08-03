import { IsString } from "class-validator"

import { IsNotBlank } from "@src/util"

export class Credentials {

    @IsString()
    @IsNotBlank()
    public apiKey: string

    @IsString()
    @IsNotBlank()
    public accountId: string
}

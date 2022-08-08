import { IsOptional, IsString } from "class-validator"
import { Metadata } from "cloudflare-images"

import { IsNotBlank } from "@src/util"
// import { CredentialsRequest } from "./CredentialsRequest"

export class CreateImageRequest {

    @IsString()
    @IsNotBlank()
    public apiKey: string

    @IsString()
    @IsNotBlank()
    public accountId: string


    @IsString()
    @IsNotBlank()
    public id: string

    @IsString()
    @IsNotBlank()
    public fileName: string

    public fileData: Blob

    @IsOptional()
    public metadata?: string | Metadata

    @IsOptional()
    public requireSignedURLs?: boolean
}

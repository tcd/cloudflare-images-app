import axios, { Axios } from "axios"
import type {
    CloudflareClientOptions,
    Requests,
    Responses,
    Variants,
} from "cloudflare-images"

import { CONFIG } from "@app/lib"

export class ServerClient {

    public baseUrl: string
    public options: CloudflareClientOptions
    public client: Axios

    constructor(options: CloudflareClientOptions) {
        this.options = options
        this.baseUrl = CONFIG.apiUrl
        this.client = axios.create({
            baseURL: this.baseUrl,
            // timeout: 1000,
            // headers: { "X-Custom-Header": "foobar" },
        })
    }

    public async uploadImage(request: Requests.ImageUpload): Promise<Responses.UploadImage> {
        return null
    }

    public async listImages(options: Requests.ListImages): Promise<Responses.ListImages> {
        const request = {
            credentials: this.options,
            options: options,
        }
        const response = await this.client.post("images", request)
        return response.data
    }

    public async deleteImage(imageId: string): Promise<Responses.DeleteImage> {
        return null
    }

    public async getImageDetails(imageId: string): Promise<Responses.ImageDetails> {
        return null
    }

    public async createImageVariant(options: Variants.Variant): Promise<Responses.Variant> {
        return null
    }

    public async listVariants(): Promise<Responses.ListVariants> {
        const request = {
            credentials: this.options,
        }
        const response = await this.client.post("variants", request)
        return response.data
    }

    public async getStats(): Promise<Responses.UsageStatistics> {
        const request = {
            credentials: this.options,
        }
        const response = await this.client.post("usage", request)
        return response.data
    }
}

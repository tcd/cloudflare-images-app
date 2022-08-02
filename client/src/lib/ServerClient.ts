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

    private buildRequest(data: any = {}): any {
        return {
            credentials: this.options,
            ...data,
        }
    }

    public async uploadImage(request: Requests.ImageUpload): Promise<Responses.UploadImage> {
        return null
    }

    public async listImages(options: Requests.ListImages): Promise<Responses.ListImages> {
        const request = this.buildRequest({ options })
        const response = await this.client.post("images/list", request)
        return response.data
    }

    public async deleteImage(imageId: string): Promise<Responses.DeleteImage> {
        const request = this.buildRequest({ id: imageId })
        const response = await this.client.post("images/delete", request)
        return response.data
    }

    public async getImageDetails(imageId: string): Promise<Responses.ImageDetails> {
        const request = this.buildRequest({ id: imageId })
        const response = await this.client.post("images/get", request)
        return response.data
    }

    public async createImageVariant(options: Variants.Variant): Promise<Responses.VariantDetails> {
        const request = this.buildRequest({ options })
        const response = await this.client.post("variants/create", request)
        return response.data
    }

    public async listVariants(): Promise<Responses.ListVariants> {
        const request = this.buildRequest()
        const response = await this.client.post("variants/list", request)
        return response.data
    }

    public async getVariant(variantId: string): Promise<Responses.VariantDetails> {
        const request = this.buildRequest({ id: variantId })
        const response = await this.client.post("variants/get", request)
        return response.data
    }

    public async deleteVariant(variantId: string): Promise<Responses.Response> {
        const request = this.buildRequest({ id: variantId })
        const response = await this.client.post("variants/delete", request)
        return response.data
    }

    public async getStats(): Promise<Responses.UsageStatistics> {
        const request = this.buildRequest()
        const response = await this.client.post("usage", request)
        return response.data
    }
}

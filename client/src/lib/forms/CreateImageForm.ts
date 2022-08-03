import type Cloudflare from "cloudflare-images"
import { isBlank } from "@app/lib"

// =============================================================================
// Form Data
// =============================================================================

export interface CreateImageFormData {
    id: string
    fileName: string
    fileData: Blob
    metadata?: Record<string, any>
    requireSignedURLs: boolean
}

export const initialValues: CreateImageFormData = {
    id: "",
    fileName: "",
    fileData: null,
    // metadata: {},
    requireSignedURLs: false,
}

export const validate = (values: CreateImageFormData): Record<keyof CreateImageFormData, string> => {
    // console.log({ values })
    const errors = {} as Record<keyof CreateImageFormData, string>

    if (isBlank(values.id))                { errors.id = "required" }
    if (isBlank(values.requireSignedURLs)) { errors.requireSignedURLs = "required" }

    return errors
}

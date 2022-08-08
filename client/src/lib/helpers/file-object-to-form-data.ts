import type Cloudflare from "cloudflare-images"
import { DateTime } from "luxon"
import { getImageDimensions, isDataUri, isBlank } from "@app/lib"

interface FileObject {
    readonly file: File
    // /** A base64-encoded Data URI */
    readonly data?: string | ArrayBuffer
}

export const fileObjectToFormData = async (fileObject: FileObject, req: Partial<Cloudflare.Requests.CreateImage> = {}): Promise<FormData> => {
    const { file, data } = fileObject
    if (!isDataUri(data)) {
        throw new Error("data passed was not a data uri")
    }
    const fileData: Blob = await (await fetch(data)).blob()
    const dimensions = await getImageDimensions(data)
    const metadata = {
        updatedAt: DateTime.now().toISO(),
        size: file.size,
        type: file.type,
        ...dimensions,
    }
    const formData = new FormData()
    formData.append("fileData", fileData, file.name)
    // formData.append("metadata", new Blob([JSON.stringify(metadata)]), { contentType: "application/json" })
    formData.append("metadata", JSON.stringify(metadata))
    if (!isBlank(req?.id))                { formData.append("id", req.id) }
    if (!isBlank(req?.fileName))          { formData.append("fileName", req.fileName) }
    if (!isBlank(req?.requireSignedURLs)) { formData.append("requireSignedURLs", req.requireSignedURLs == true ? "true" : "false") }
    return formData
}

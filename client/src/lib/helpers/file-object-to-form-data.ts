import { DateTime } from "luxon"
import { getImageDimensions, isDataUri } from "@app/lib"

interface FileObject {
    readonly file: File
    // /** A base64-encoded Data URI */
    readonly data?: string | ArrayBuffer
}

export const fileObjectToFormData = async (fileObject: FileObject): Promise<FormData> => {
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
    formData.append("fileName", file.name)
    formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }))
    formData.append("fileData", fileData, file.name)
    return formData
}

export const isImage = (file: File): boolean => {
    return file?.type?.split("/")?.[0] === "image"
}

const bytesInKiloB = 1024 as const // 2 ** 10;
const bytesInMegaB = 1048576 as const // bytesInKiloB ** 2;

export const convertBytesToMbsOrKbs = (fileSize: number): string => {
    let size = ""
    if (fileSize >= bytesInMegaB) {
        size = `${fileSize / bytesInMegaB} megabytes`
    } else if (fileSize >= bytesInKiloB) {
        size = `${fileSize / bytesInKiloB} kilobytes`
    } else {
        size = `${fileSize} bytes`
    }
    return size
}

const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
export const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) { return "0 Bytes" }
    decimals = decimals < 0 ? 0 : decimals
    const i = Math.floor(Math.log(bytes) / Math.log(bytesInKiloB))
    const result = parseFloat((bytes / Math.pow(bytesInKiloB, i)).toFixed(decimals)) + " " + sizes[i]
    return result
}

export const createFileFromUrl = async (url: string): Promise<File> => {
    const response = await fetch(url)
    const data = await response?.blob()
    const metadata = { type: data.type }
    const filename = url.replace(/\?.+/, "").split("/").pop()
    return new File([data], filename!, metadata)
}

export const readFile = (file: File): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject: (reason?: ProgressEvent<FileReader>) => void) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            resolve(event?.target?.result)
        }
        reader.onerror = (event) => {
            reader.abort()
            reject(event)
        }
        reader.readAsDataURL(file)
    })
}

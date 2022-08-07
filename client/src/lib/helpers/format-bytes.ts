/** 2 ** 10 */
const bytesInKiloB = 1024 as const

const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
export const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) { return "0 Bytes" }
    decimals = decimals < 0 ? 0 : decimals
    const i = Math.floor(Math.log(bytes) / Math.log(bytesInKiloB))
    const result = parseFloat((bytes / Math.pow(bytesInKiloB, i)).toFixed(decimals)) + " " + sizes[i]
    return result
}

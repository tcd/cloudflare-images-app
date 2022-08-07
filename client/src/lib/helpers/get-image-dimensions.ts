// https://stackoverflow.com/questions/5633264/javascript-get-image-dimensions

interface Dimensions {
    width: number
    height: number
}

/**
 * Returns image dimensions for specified URL.
 */
export const getImageDimensions = (url: string): Promise<Dimensions> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve({
            width:  img.width,
            height: img.height,
        })
        img.onerror = (error) => reject(error)
        img.src = url
    })
}

/**
 * Returns image dimensions for specified URL.
 */
export const getImageDimensionsSync = (url: string): Dimensions => {
    const img = document.createElement("img")
    img.src = url
    return {
        width: img.naturalWidth,
        height: img.naturalHeight,
    }
}

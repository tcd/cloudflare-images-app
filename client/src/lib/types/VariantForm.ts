// =============================================================================
// Metadata
// =============================================================================

/** Valid values for the `Variant.options.metadata` */
export const MetadataOptions = {
    "Strip all metadata":         "none",
    "Strip all except copyright": "copyright",
    "Keep all metadata":          "keep",
} as const

export type MetadataOptionDescription = keyof typeof MetadataOptions
/** Valid value for the `Variant.options.metadata` */
export type MetadataOption = typeof MetadataOptions[MetadataOptionDescription]

// =============================================================================
// Fit
// =============================================================================

// /**
//  * Image will be shrunk in size to fully fit within the given width or height,
//  * but will not be enlarged.
//  */
// export type ScaleDown = "scale-down"
// /**
//  * Image will be resized (shrunk or enlarged) to be as large as possible within
//  * the given width or height while preserving the aspect ratio.
//  */
// export type Contain = "contain"
// /**
//  * Image will be resized to exactly fill the entire area specified by
//  * width and height, and will be cropped if necessary.
//  */
// export type Cover = "cover"
// /**
//  * Image will be shrunk and cropped to fit within the area specified by width and height.
//  * The image will not be enlarged.
//  * For images smaller than the given dimensions it is the same as `scale-down`.
//  * For images larger than the given dimensions, it is the same as `cover`.
//  */
// export type Crop = "crop"
// /**
//  * Image will be resized (shrunk or enlarged) to be as large as possible within the
//  * given width or height while preserving the aspect ratio, and the extra area will
//  * be filled with a background color (white by default).
//  */
// export type Pad = "pad"

export const VariantFits = {
    "Scale down": "scale-down",
    "Contain": "contain",
    "Cover": "cover",
    "Crop": "crop",
    "Pad": "pad",
} as const

export type VariantFitDescription = keyof typeof VariantFits
export type VariantFit = typeof VariantFits[VariantFitDescription]

// =============================================================================
// Form Data
// =============================================================================

export interface CreateVariantFormData {
    /** API item identifier tag. */
    id: string
    /** The fit property describes how the width and height dimensions should be interpreted. */
    fit: VariantFit
    /** What EXIF data should be preserved in the output image. */
    metadata?: "keep" | "copyright" | "none"
    /** Maximum width in image pixels. */
    width: number
    /** Maximum height in image pixels. */
    height: number
    /** Indicates whether the variant can access an image without a signature, regardless of image access control. */
    neverRequireSignedURLs?: boolean
}

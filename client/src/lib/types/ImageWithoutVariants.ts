import Cloudflare from "cloudflare-images"

export type ImageWithoutVariants = Omit<Cloudflare.Images.Image, "variants">

export type ImageWithoutVariantsWithSrc = ImageWithoutVariants & { src: string }

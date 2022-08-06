export interface FileObject {
    readonly file: File
    readonly data: string | ArrayBuffer | null | undefined
}

export interface PreviewListClasses {
    image?: string
    imageContainer?: string
    removeButton?: string
    root?: string
}

export type GetPreviewIconFunc = (fileObject: FileObject, classes: PreviewListClasses,) => JSX.Element

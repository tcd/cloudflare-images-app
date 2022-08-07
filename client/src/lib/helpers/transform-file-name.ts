import {
    changeCase,
    BulkUploadForm as FormData,
    isBlank,
    isRegexValid,
} from "@app/lib"

interface Options {
    fileName: string
    options: FormData.BulkUploadFormData
}

const extensionPattern = /(\.)[^.]+$/

export const transformFileName = ({ fileName, options }: Options): string => {
    let transformed = fileName
    if (options?.removeExtension == true) {
        transformed = transformed.replace(extensionPattern, "")
    }
    transformed = changeCase(transformed, options?.caseChange)
    if (!isBlank(options?.idTransform) && isRegexValid(options?.idTransform)) {
        return options.idTransform.replace("<name>", transformed)
    }
    return transformed
}

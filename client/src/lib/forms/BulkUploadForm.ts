import { CaseChange, CaseChanges, CaseChangeDescriptions } from "../helpers/change-case"
import { isBlank } from "../helpers/is-blank"
// import { isRegexValid } from "../helpers/is-regex-valid"

export interface BulkUploadFormData {
    requireSignedURLs: boolean
    removeExtension: boolean
    caseChange: CaseChange
    idTransform: string
}

export const initialValues: BulkUploadFormData = {
    requireSignedURLs: false,
    removeExtension: true,
    caseChange: "none",
    idTransform: "",
}

export const validate = (values: BulkUploadFormData): Record<keyof BulkUploadFormData, string> => {
    // console.log({ values })
    const errors = {} as Record<keyof BulkUploadFormData, string>

    // if (isBlank(values.id))                { errors.id = "required" }
    // if (isBlank(values.requireSignedURLs)) { errors.requireSignedURLs = "required" }
    // if (isBlank(values.requireSignedURLs)) { errors.requireSignedURLs = "required" }

    // if (!isRegexValid(values.transformationOutput)) {
    //     errors.transformationOutput = "invalid regular expression"
    // }

    if (!isBlank(values.idTransform)) {
        if (!values?.idTransform?.includes("<name>")) {
            errors.idTransform = "pattern must include '<name>'"
        }
    }

    return errors
}

export const caseChangeOptions = Object.entries(CaseChanges).map(([key, value]) => ({
    label: key,
    value: value,
    description: CaseChangeDescriptions[value],
}))

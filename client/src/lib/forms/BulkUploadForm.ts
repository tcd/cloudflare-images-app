import { CaseChange, CaseChanges } from "../helpers/change-case"

export interface BulkUploadFormData {
    removeExtension: boolean
    caseChange: CaseChange
    transformationInput: string
    transformationOutput: string
}

export const initialValues: BulkUploadFormData = {
    removeExtension: false,
    caseChange: "none",
    transformationInput: "",
    transformationOutput: "",
}

export const validate = (values: BulkUploadFormData): Record<keyof BulkUploadFormData, string> => {
    // console.log({ values })
    const errors = {} as Record<keyof BulkUploadFormData, string>

    // if (isBlank(values.id))                { errors.id = "required" }
    // if (isBlank(values.requireSignedURLs)) { errors.requireSignedURLs = "required" }

    return errors
}

export const caseChangeOptions = Object.entries(CaseChanges).map(([key, value]) => ({ label: key, value }))

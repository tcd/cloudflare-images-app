import isString from "lodash/isString"

import { isBlank } from "./is-blank"
import { isAxiosError } from "./is-axios-error"

export const parseError = (error: any, defaultMessage = "Error"): string => {
    try {
        if (isAxiosError(error)) {
            if (!isBlank(error?.status)) {
                return `Error: '${error.status}'`
            }
        }

        if (isBlank(error)) {
            return defaultMessage
        }

        if (isString(error)) {
            return error
        }

        // if (!isBlank(error?.message)) {
        //     if (error?.message?.startsWith("Error")) {
        //         return error.message
        //     } else {
        //         return `Error: '${error.message}'`
        //     }
        // }
        //
        // if (!isBlank(error?.cause?.message)) {
        //     if (error?.cause?.message?.startsWith("Error")) {
        //         return error.cause.message
        //     } else {
        //         return `Error: '${error.cause.message}'`
        //     }
        // }

        // if (!isBlank(error?.response)) {
        //     if (isString(error.response)) {
        //         return error.response
        //     }
        //     if (error.response?.message) {
        //         return error.response.message
        //     }
        //     if (error.response?.error) {
        //         return error.response.error
        //     }
        // }

        // console.error(error)

        return defaultMessage
    } catch (anotherError) {
        console.error(anotherError)
        return defaultMessage
    }
}

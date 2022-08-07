import isString from "lodash/isString"

export const isDataUri = (value: any): value is string => {
    if (isString(value)) {
        if (value.startsWith("data:image")) {
            return true
        }
    }
    return false
}

export const isRegexValid = (input: string): boolean => {
    try {
        new RegExp(input)
        return true
    } catch(_error) {
        return false
    }
}

import { CustomError } from "./CustomError"

export const errorTest = () => {
    try {
        throw new CustomError("this is an error")
    } catch (error) {
        const isError = error instanceof Error
        console.log(isError)
        debugger
    }
}

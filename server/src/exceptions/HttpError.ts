/**
 * Used to throw HTTP errors.
 */
export class HttpError extends Error {
    public httpCode: number

    constructor(httpCode: number, message?: string) {
        super()
        Object.setPrototypeOf(this, HttpError.prototype)

        if (httpCode) this.httpCode = httpCode
        if (message) this.message = message

        this.stack = new Error().stack
    }
}

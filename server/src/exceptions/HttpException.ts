import { ErrorData } from "@src/util"
import { ValidationError } from "class-validator"
import { HttpError } from "./HttpError"

export class HttpException extends HttpError {
    name = "HttpException"

    public _errors: ErrorData
    public innerError: Error

    constructor(status: number, message: string, innerError: Error = null) {
        super(status, message)
        Object.setPrototypeOf(this, HttpException.prototype)
        this._errors = new ErrorData()
        this.innerError = innerError
    }

    public static fromValidationErrors(errors: ValidationError[]): HttpException {
        const ex = new HttpException(422, "One or more validation errors occurred.")
        ex.addValidationErrors(errors)
        return ex
    }

    public add(key: string, error: string | string[] | ErrorData): void {
        this._errors.add(key, error)
    }

    public addError(key: string, error: string): void {
        this._errors.addError(key, error)
    }

    public addErrors(key: string, errors: string[]): void {
        this._errors.addErrors(key, errors)
    }

    public addNestedErrorData(key: string, errorData: ErrorData): void {
        this._errors.addNestedErrorData(key, errorData)
    }

    public toJSON() {
        return {
            status:  this.httpCode,
            message: this.message,
            errors:  this._errors.toJSON(),
        }
    }

    public addValidationErrors(errors: ValidationError[]): void {
        this._errors = processValidations(errors)
    }
}

const processValidations = (errors: ValidationError[]): ErrorData => {
    const data = new ErrorData()
    for (const error of errors) {
        processValidation(data, error)
    }
    return data
}

const processValidation = (data: ErrorData, error: ValidationError): ErrorData => {
    const anyChildren = (error?.children?.length ?? 0) > 0
    if (anyChildren) {
        const nestedData = new ErrorData()
        for (const child of error.children) {
            processValidation(nestedData, child)
        }
        data.add(error.property, nestedData)
    } else if (error.constraints) {
        data.add(error.property, Object.values(error.constraints))
    }
    return data
}

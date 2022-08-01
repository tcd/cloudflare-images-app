// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
const isErrorData = (value: any): value is ErrorData => {
    return value?.isErrorData === true
}

const isArray = (value: any): value is string[] => {
    return Array.isArray(value)
}

export class ErrorData {
    public isErrorData: true = true
    private _errors: Record<string, string[] | ErrorData>

    constructor() {
        this._errors = {}
    }

    public add(key: string, error: string | string[] | ErrorData): void {
        if (isErrorData(error)) {
            this.addNestedErrorData(key, error)
        } else if (isArray(error)) {
            this.addErrors(key, error)
        } else {
            this.addError(key, error)
        }
    }

    public addError(key: string, error: string): void {
        if (!this._errors.hasOwnProperty(key)) {
            this._errors[key] = []
        }
        // @ts-ignore: next-line
        this._errors[key].push(error)
    }

    public addErrors(key: string, errors: string[]): void {
        if (!this._errors.hasOwnProperty(key)) {
            this._errors[key] = []
        }
        // @ts-ignore: next-line
        this._errors[key].push(...errors)
    }

    public addNestedErrorData(key: string, errorData: ErrorData): void {
        if (!this._errors.hasOwnProperty(key)) {
            this._errors[key] = errorData
        }
    }

    public toJSON() {
        const json: any = {}
        for (const [key, value] of Object.entries(this._errors)) {
            if (isErrorData(value)) {
                json[key] = value.toJSON()
            } else {
                json[key] = value
            }
        }
        return json
    }
}

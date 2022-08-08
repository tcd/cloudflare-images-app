// https://www.smashingmagazine.com/2020/08/error-handling-nodejs-error-classes/
export class CustomError extends Error {

    // get name() {
    //     return this.constructor.name
    // }
    name = "CustomError"

    public isCustomError: true = true

    public override cause?: Error

    constructor(message = "An error occurred") {
        // super("An error occurred", { cause: error })
        super(message)
        Object.setPrototypeOf(this, CustomError.prototype)
    }

    // public toJSON() {
    //     return {
    //         message:      this.message,
    //         cause:        this.cause,
    //         isAxiosError: this.wrapsAxiosError,
    //     }
    // }
}

// CustomError.name

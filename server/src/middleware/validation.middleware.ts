import { plainToInstance } from "class-transformer"
import { validate, ValidationError } from "class-validator"
import { RequestHandler } from "express"

import { HttpException } from "@src/exceptions/HttpException"

export const validationMiddleware = (
    type: any,
    value: string | "body" | "query" | "params" = "body",
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = false,
): RequestHandler => {
    return (req, res, next) => {
        const obj = plainToInstance(type, req[value])
        validate(obj, { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                next(HttpException.fromValidationErrors(errors))
            } else {
                next()
            }
        })
    }
}
